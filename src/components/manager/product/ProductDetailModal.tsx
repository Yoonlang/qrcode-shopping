import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useOverlay } from "@toss/use-overlay";

import ImageWithFallback from "@/components/common/ImageWithFallback";
import { StyledModal } from "@/components/manager/DashboardItems";
import { productDetailColumns } from "@/components/manager/product/const";
import ProductEditModal from "@/components/manager/product/ProductEditModal";
import { OverlayControl, Product } from "@/const";

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
        > img,
        > svg {
          min-width: 276px;
          min-height: 276px;
          color: var(--color-gray-60);
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

const ProductDetailModal = ({
  overlayControl,
  modalProductData,
}: {
  overlayControl: OverlayControl;
  modalProductData: Product;
}) => {
  const { productId, image, composition, weightGPerM2, widthInch, colors } =
    modalProductData;
  const overlay = useOverlay();

  const rows = colors.map(({ colorName, colorId }) => {
    return {
      sampleYardage: `${colorId} ${colorName}`,
    };
  });

  return (
    <StyledModal
      open={overlayControl.isOpen}
      onClose={overlayControl.exit}
      data-testid={"product-detail-modal"}
    >
      <StyledDetailModalContainer>
        <div className="productContainer">
          <div className="baseInfo">
            <div className="imageContainer">
              <ImageWithFallback
                width={276}
                height={276}
                src={image}
                alt={productId}
              />
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
            onClick={() => {
              overlay.open((control) => (
                <ProductEditModal
                  overlayControl={control}
                  product={modalProductData}
                />
              ));
              overlayControl.close();
            }}
            data-testid={"product-detail-open-edit-modal-button"}
          >
            수정
          </Button>
          <Button onClick={overlayControl.exit}>닫기</Button>
        </div>
      </StyledDetailModalContainer>
    </StyledModal>
  );
};

export default ProductDetailModal;
