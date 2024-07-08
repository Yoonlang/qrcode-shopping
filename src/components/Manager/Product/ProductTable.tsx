import { Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { styled } from "styled-components";

import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
  StyledModal,
} from "@/components/Manager/DashboardItems";

const fileTypes = ["JPG", "PNG"];

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

export const ProductDetail = ({ product, closeModal, openEditModal }) => {
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
        <Button onClick={openEditModal}>수정</Button>
        <Button onClick={closeModal}>닫기</Button>
      </div>
    </StyledDetailModalContainer>
  );
};

export const ProductEdit = ({
  handleModalClose,
  formik,
  openDetailModal,
  product,
}) => {
  const colors = formik.values.colors;
  const colorRefs = useRef<HTMLInputElement[]>([]);

  const handleChangeFile = (file) => {
    formik.setFieldValue("image", file);
  };

  const handleAddColor = () => {
    const newColors = [...formik.values.colors, ""];
    formik.setFieldValue("colors", newColors);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === "Enter" && !e.nativeEvent.isComposing) {
      handleAddColor();
    }
  };

  const handleDeleteColor = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newColors = [...formik.values.colors];
    newColors.splice(index, 1);
    formik.setFieldValue("colors", newColors);
  };

  useEffect(() => {
    if (
      colors.length > 0 &&
      colorRefs.current[colors.length - 1] &&
      formik.values.productId !== ""
    ) {
      colorRefs.current[colors.length - 1].focus();
    }
  }, [colors.length]);

  useEffect(() => {
    const {
      productId,
      image,
      colors,
      price,
      weightGPerM2,
      widthInch,
      composition,
    } = product;
    formik.setFieldValue("method", "PUT");
    formik.setFieldValue("productId", productId);
    formik.setFieldValue("weightGPerM2", weightGPerM2);
    formik.setFieldValue("widthInch", widthInch);
    formik.setFieldValue("composition", composition);
    formik.setFieldValue("price", price);

    if (image) {
      formik.setFieldValue("image", true);
    }

    const handledColors = colors.map(({ colorName }) => colorName);
    formik.setFieldValue("colors", handledColors);
  }, [product]);

  return (
    <ProductAddModal>
      <h2>Edit</h2>
      <ProductInput label="Product ID" name="productId" formik={formik} />
      <FileUploader
        handleChange={handleChangeFile}
        name="file"
        types={fileTypes}
        disabled={formik.values.image === true}
      />
      {formik.values.image === true ? (
        <Button
          onClick={() => {
            handleChangeFile(null);
          }}
        >
          기존 이미지 제거
        </Button>
      ) : (
        formik.values.image !== null && <div>{formik.values.image.name}</div>
      )}
      <ProductInput label="Composition" name="composition" formik={formik} />
      <ProductInput label="Weight" name="weightGPerM2" formik={formik} />
      <ProductInput label="Width" name="widthInch" formik={formik} />
      {colors.length > 0 &&
        colors.map((color, index) => (
          <StyledFlexDiv key={index}>
            <TextField
              label="Sample Yardage"
              name={`colors.${index}`}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
              value={color}
              inputRef={(el) => (colorRefs.current[index] = el)}
              fullWidth
            />
            {index !== colors.length - 1 ? (
              <Button onClick={(e) => handleDeleteColor(e, index)}>
                Delete
              </Button>
            ) : (
              <Button onClick={handleAddColor}>Add</Button>
            )}
          </StyledFlexDiv>
        ))}
      <StyledFlexDiv>
        <Button
          onClick={async () => {
            await formik.handleSubmit();
            openDetailModal();
          }}
        >
          Confirm
        </Button>
        <Button onClick={handleModalClose}>Cancel</Button>
      </StyledFlexDiv>
    </ProductAddModal>
  );
};

export const ProductDetailModal = ({
  isModalOpen,
  closeModal,
  modalProductData,
  formik,
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
      onClose={closeModal}
      data-testid={"product-detail-modal"}
    >
      <>
        {isEditMode ? (
          <ProductEdit
            handleModalClose={closeModal}
            formik={formik}
            openDetailModal={openDetailModal}
            product={modalProductData}
          />
        ) : (
          <ProductDetail
            product={modalProductData}
            closeModal={closeModal}
            openEditModal={openEditModal}
          />
        )}
      </>
    </StyledModal>
  );
};

const ProductTable = ({ productList, setSelectedProductList, formik }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProductData, setModalProductData] = useState(null);
  const tableRows = handleProductListForTable(productList);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      formik.resetForm();
    }
  }, [isModalOpen]);

  return (
    <>
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={tableRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
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
      {isModalOpen && (
        <ProductDetailModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalProductData={modalProductData}
          formik={formik}
        />
      )}
    </>
  );
};

export default ProductTable;
