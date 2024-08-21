import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import JSZip from "jszip";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

import { getProductList } from "@/api/products";
import MessageDialog from "@/components/common/MessageDialog";
import { PRODUCT_DEFAULT, PRODUCT_TRASH_CAN } from "@/components/manager/const";
import DataFolderReassignModal from "@/components/manager/folder/DataFolderReassignModal";
import ExcelProductCreateModal from "@/components/manager/product/ExcelProductCreateModal";
import ProductCreateModal from "@/components/manager/product/ProductCreateModal";
import ProductTable from "@/components/manager/product/ProductTable";
import { Folder, Product } from "@/const";
import { reassignFolder } from "@/services/folders";
import { deleteProductList } from "@/services/products";

const QR_CODE_LENGTH = 254; // 3cm

const StyledProductBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > .header {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
`;

const ProductBoard = ({
  folder,
  productFolderList,
}: {
  folder: Folder;
  productFolderList: Folder[];
}) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const filteredProductList = productList.filter((p) => {
    if (folder.id === PRODUCT_DEFAULT) {
      return p.metadata.folderId !== PRODUCT_TRASH_CAN;
    }
    return p.metadata.folderId === folder.id;
  });
  const [selectedProductList, setSelectedProductList] = useState<string[]>([]);
  const overlay = useOverlay();

  const handleProductListUpdate = async () => {
    try {
      const productList = await getProductList();
      setProductList(productList);
    } catch {
      overlay.open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["데이터 가져오기 실패"]}
        />
      ));
    }
  };

  const handleProductRestore = async () => {
    try {
      await reassignFolder(
        filteredProductList.filter((f) =>
          selectedProductList.find((productId) => f.productId === productId)
        ),
        PRODUCT_DEFAULT
      );
      await handleProductListUpdate();
    } catch {
      overlay.open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["데이터 복구 실패"]}
        />
      ));
    }
  };

  const handleProductSoftDelete = async () => {
    try {
      await reassignFolder(
        filteredProductList.filter((f) =>
          selectedProductList.find((productId) => f.productId === productId)
        ),
        PRODUCT_TRASH_CAN
      );
      await handleProductListUpdate();
    } catch {
      overlay.open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["데이터 삭제 실패"]}
        />
      ));
    }
  };

  const handleProductPermanentDelete = async () => {
    try {
      await deleteProductList(selectedProductList);
      await handleProductListUpdate();
    } catch {
      overlay.open((control) => (
        <MessageDialog
          overlayControl={control}
          messageList={["데이터 영구 삭제 실패"]}
        />
      ));
    }
  };

  const handleProductQrCodeCreate = async () => {
    if (selectedProductList.length > 0) {
      try {
        const zip = new JSZip();
        const canvas = document.createElement("canvas");
        const qrCodeList: { productId: string; image: string }[] = [];
        for (const productId of selectedProductList) {
          QRCode.toCanvas(
            canvas,
            `products/${productId}`,
            { width: QR_CODE_LENGTH },
            (e) => {
              if (e) {
                throw e;
              }

              qrCodeList.push({
                productId,
                image: canvas.toDataURL("image/png"),
              });
            }
          );
        }

        const downloadLink = document.createElement("a");
        if (qrCodeList.length === 1) {
          downloadLink.href = qrCodeList[0].image;
          downloadLink.download = `${qrCodeList[0].productId}.png`;
        } else {
          for (const { image, productId } of qrCodeList) {
            const response = await fetch(image);
            const blob = await response.blob();
            zip.file(`${productId}.png`, blob);
          }
          const zipContent = await zip.generateAsync({ type: "blob" });
          downloadLink.href = URL.createObjectURL(zipContent);
          downloadLink.download = `qrcodes.zip`;
        }
        downloadLink.click();
      } catch (e) {
        overlay.open((control) => (
          <MessageDialog
            overlayControl={control}
            messageList={[e?.message ?? "QR code 생성 실패"]}
          />
        ));
      }
    }
  };

  const handleProductFolderReassign = () => {
    if (selectedProductList.length > 0) {
      overlay.open((control) => (
        <DataFolderReassignModal
          overlayControl={control}
          selectedDataList={filteredProductList.filter((f) =>
            selectedProductList.find((productId) => f.productId === productId)
          )}
          folder={folder}
          folderList={productFolderList}
          onReassignComplete={async () => {
            await handleProductListUpdate();
          }}
        />
      ));
    }
  };

  useEffect(() => {
    void handleProductListUpdate();
  }, []);

  return (
    <StyledProductBoard>
      <div className="header">
        <h3>product / {folder.name}</h3>
        <div>
          {folder.id === PRODUCT_TRASH_CAN ? (
            <>
              <Button onClick={handleProductRestore}>데이터 복구</Button>
              <Button onClick={handleProductPermanentDelete}>
                데이터 영구 삭제
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleProductQrCodeCreate}>QR CODE 생성</Button>
              <Button onClick={handleProductFolderReassign}>
                데이터 폴더 이동
              </Button>
              <Button
                onClick={() => {
                  overlay.open((control) => (
                    <ProductCreateModal
                      overlayControl={control}
                      folder={folder}
                      onProductCreate={handleProductListUpdate}
                    />
                  ));
                }}
              >
                데이터 추가
              </Button>
              <Button
                onClick={() => {
                  overlay.open((control) => (
                    <ExcelProductCreateModal
                      overlayControl={control}
                      folder={folder}
                      productList={productList}
                      onProductListCreate={handleProductListUpdate}
                    />
                  ));
                }}
              >
                데이터 추가(엑셀)
              </Button>
              <Button onClick={handleProductSoftDelete}>데이터 삭제</Button>
            </>
          )}
        </div>
      </div>
      <ProductTable
        folder={folder}
        folderList={productFolderList}
        productList={filteredProductList}
        setSelectedProductList={setSelectedProductList}
      />
    </StyledProductBoard>
  );
};

export default ProductBoard;
