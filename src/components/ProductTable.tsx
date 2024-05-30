import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { StyledModal } from "./DashboardItems";
import styled from "styled-components";

const columns: GridColDef[] = [
  { field: "id", headerName: "Product ID", width: 200 },
];

const handleProductListForTable = (productList) => {
  return productList.map((product) => {
    return {
      id: product.documentId,
      __product__: product,
    };
  });
};

const StyledModalContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: #fff;
`;

const ProductDetail = () => {
  return <StyledModalContainer>detail</StyledModalContainer>;
};

const ProductEdit = () => {
  return <StyledModalContainer>edit</StyledModalContainer>;
};

const ProductDetailModal = ({ isModalOpen, closeModal, modalProductData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <StyledModal open={isModalOpen} onClose={closeModal}>
      {isEditMode ? <ProductEdit /> : <ProductDetail />}
    </StyledModal>
  );
};

const ProductTable = ({ productList }) => {
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
