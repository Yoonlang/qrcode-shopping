import { Button } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import {
  getProductList,
  permanentDeleteProductList,
  reassignFolder,
} from "@/api";
import { PRODUCT_DEFAULT, PRODUCT_TRASH_CAN } from "@/components/Manager/const";
import DataFolderReassignModal from "@/components/Manager/Folder/DataFolderReassignModal";
import ProductCreateModal from "@/components/Manager/Product/ProductCreateModal";
import ProductTable from "@/components/Manager/Product/ProductTable";
import MessageDialog from "@/components/MessageDialog";
import { Folder, Product } from "@/const";

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

  const handleProductListUpdate = () => {
    getProductList(
      (data) => {
        setProductList(data);
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 가져오기 실패"]}
          />
        ));
      }
    );
  };

  const handleProductRestore = () => {
    reassignFolder(
      filteredProductList.filter((f) =>
        selectedProductList.find((productId) => f.productId === productId)
      ),
      PRODUCT_DEFAULT,
      () => {
        handleProductListUpdate();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 복구 실패"]}
          />
        ));
      }
    );
  };

  const handleProductSoftDelete = () => {
    reassignFolder(
      filteredProductList.filter((f) =>
        selectedProductList.find((productId) => f.productId === productId)
      ),
      PRODUCT_TRASH_CAN,
      () => {
        handleProductListUpdate();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 삭제 실패"]}
          />
        ));
      }
    );
  };

  const handleProductPermanentDelete = () => {
    permanentDeleteProductList(
      selectedProductList,
      () => {
        handleProductListUpdate();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 영구 삭제 실패"]}
          />
        ));
      }
    );
  };

  const handleProductFolderReassign = () => {
    if (selectedProductList.length > 0) {
      overlay.open(({ isOpen, close }) => (
        <DataFolderReassignModal
          isModalOpen={isOpen}
          onModalClose={close}
          selectedDataList={filteredProductList.filter((f) =>
            selectedProductList.find((productId) => f.productId === productId)
          )}
          folder={folder}
          folderList={productFolderList}
          onReassignComplete={() => {
            handleProductListUpdate();
          }}
        />
      ));
    }
  };

  useEffect(() => {
    handleProductListUpdate();
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
              <Button onClick={handleProductFolderReassign}>
                데이터 폴더 이동
              </Button>
              <Button onClick={handleProductSoftDelete}>데이터 삭제</Button>
              <Button
                onClick={() => {
                  overlay.open(({ isOpen, close }) => (
                    <ProductCreateModal
                      isModalOpen={isOpen}
                      onModalClose={close}
                      onProductCreate={handleProductListUpdate}
                    />
                  ));
                }}
              >
                데이터 추가
              </Button>
            </>
          )}
        </div>
      </div>
      <ProductTable
        productList={filteredProductList}
        setSelectedProductList={setSelectedProductList}
      />
    </StyledProductBoard>
  );
};

export default ProductBoard;
