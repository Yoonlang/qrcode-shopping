import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import { styled } from "styled-components";

import { StyledModal } from "@/components/Manager/DashboardItems";
import { productDetailColumns } from "@/components/Manager/Product/const";
import ProductEdit from "@/components/Manager/Product/ProductEditModal";
import { Product } from "@/const";

const StyledDetailModalContainer = styled.div`
  position: relative;
  width: 730px;
  height: 520px;
  padding: 30px 30px 50px 30px;
  background-color: var(--color-white);

  .productContainer {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 20px;
    .baseInfo {
      display: flex;
      flex-direction: column;
      .imageContainer {
        min-width: 276px;
        min-height: 276px;
        > img {
          min-width: 276px;
          min-height: 276px;
        }
      }
      .productDetail {
        max-width: 276px;
        background-color: var(--color-gray-10);
        filter: drop-shadow(0 1px 2px var(--color-black));
        height: 100%;
        padding: 16px;
        overflow: auto;

        h4,
        h5 {
          margin: 5px;
        }
      }
    }
  }

  .buttonContainer {
    display: flex;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
`;

export const ProductDetail = ({
  product,
  onModalClose,
  onEditModalOpen,
}: {
  product: Product;
  onModalClose: () => void;
  onEditModalOpen: () => void;
}) => {
  const { productId, image, composition, weightGPerM2, widthInch, colors } =
    product;

  const rows = colors.map(({ colorName, colorId }) => {
    return {
      sampleYardage: `${colorId} ${colorName}`,
    };
  });

  return (
    <StyledDetailModalContainer>
      <div className="productContainer">
        <div className="baseInfo">
          <div className="imageContainer">
            {image ? (
              <Image
                width={276}
                height={276}
                src={`${image ?? ""}`}
                loading="lazy"
                unoptimized
                alt={productId}
              />
            ) : (
              <>no image</>
            )}
          </div>
          <div className="productDetail">
            <h4>{productId}</h4>
            <h5>Comp: {composition}</h5>
            <h5>Weight (g/m2): {weightGPerM2}</h5>
            <h5>width (Inch): {widthInch}</h5>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <DataGrid
            getRowId={(obj) => obj.sampleYardage}
            rows={rows}
            columns={productDetailColumns}
            hideFooter
            density="compact"
            sx={{
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        </div>
      </div>
      <div className="buttonContainer">
        <Button
          onClick={onEditModalOpen}
          data-testid={"product-detail-open-edit-modal-button"}
        >
          수정
        </Button>
        <Button onClick={onModalClose}>닫기</Button>
      </div>
    </StyledDetailModalContainer>
  );
};

const ProductDetailModal = ({
  isModalOpen,
  onModalClose,
  modalProductData,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
  modalProductData: Product;
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const openEditModal = () => {
    setIsEditMode(true);
  };

  const openDetailModal = () => {
    setIsEditMode(false);
  };

  return (
    <StyledModal
      open={isModalOpen}
      onClose={onModalClose}
      data-testid={"product-detail-modal"}
    >
      {isEditMode ? (
        <ProductEdit
          product={modalProductData}
          onModalClose={onModalClose}
          onDetailModalOpen={openDetailModal}
        />
      ) : (
        <ProductDetail
          product={modalProductData}
          onModalClose={onModalClose}
          onEditModalOpen={openEditModal}
        />
      )}
    </StyledModal>
  );
};

export default ProductDetailModal;
