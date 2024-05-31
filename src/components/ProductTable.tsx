import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { StyledModal } from "./DashboardItems";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "Product ID", width: 200 },
];

const productDetailColumns: GridColDef[] = [
  { field: "sampleYardage", headerName: "Sample Yardage", width: 300 },
];

const handleProductListForTable = (productList) => {
  return productList.map((product) => {
    return {
      id: product.documentId,
      __product__: product,
    };
  });
};

const StyledDetailModalContainer = styled.div`
  position: relative;
  width: 730px;
  height: 520px;
  padding: 30px 30px 50px 30px;
  background-color: #fff;

  .productContainer {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 20px;
    .baseInfo {
      display: flex;
      flex-direction: column;
      > img {
        min-width: 276px;
        min-height: 276px;
      }
      > div {
        max-width: 276px;
        background-color: #fafafa;
        filter: drop-shadow(0 1px 2px #00000024);
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

const ProductDetail = ({ product }) => {
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
          <Image
            width={276}
            height={276}
            src={`${image ?? ""}`}
            loading="lazy"
            unoptimized
            alt={productId}
          />
          <div>
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
        <Button>수정</Button>
        <Button>닫기</Button>
      </div>
    </StyledDetailModalContainer>
  );
};

const ProductEdit = () => {
  return <div>edit</div>;
};

const ProductDetailModal = ({ isModalOpen, closeModal, modalProductData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <>
        {isEditMode ? (
          <ProductEdit />
        ) : (
          <ProductDetail product={modalProductData} />
        )}
      </>
    </StyledModal>
  );
};

const ProductTable = ({ productList, setSelectedProductList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProductData, setModalProductData] = useState(null);
  const tableRows = handleProductListForTable(productList);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={tableRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(selectedList) => {
            setSelectedProductList(selectedList);
          }}
          onCellClick={(cell, e) => {
            if (cell.field !== "__check__") {
              e.stopPropagation();
              setIsModalOpen(true);
              setModalProductData(cell.row.__product__);
            }
          }}
        />
      </div>
      <ProductDetailModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalProductData={modalProductData}
      />
    </>
  );
};

export default ProductTable;
