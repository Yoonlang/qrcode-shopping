import { Button } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getProductList, moveToTrash, permanentDeleteProductList } from "@/api";
import { PRODUCT_TRASH_CAN } from "@/components/Manager/const";
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

const ProductBoard = ({ folder }: { folder: Folder }) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const filteredProductList = productList.filter(
    (p) => p.metadata.folderId === folder.id
  );
  const [selectedProductList, setSelectedProductList] = useState<string[]>([]);
  const overlay = useOverlay();

  const updateProductList = () => {
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

  const handleProductSoftDelete = () => {
    moveToTrash(
      filteredProductList.filter((f) =>
        selectedProductList.find((productId) => f.productId === productId)
      ),
      () => {
        updateProductList();
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
        updateProductList();
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

  useEffect(() => {
    updateProductList();
  }, []);

  return (
    <StyledProductBoard>
      <div className="header">
        <h3>product / {folder.name}</h3>
        <div>
          {folder.id === PRODUCT_TRASH_CAN ? (
            <Button onClick={handleProductPermanentDelete}>
              데이터 영구 삭제
            </Button>
          ) : (
            <>
              <Button onClick={handleProductSoftDelete}>데이터 삭제</Button>
              <Button
                onClick={() => {
                  overlay.open(({ isOpen, close }) => (
                    <ProductCreateModal
                      isModalOpen={isOpen}
                      onModalClose={close}
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
