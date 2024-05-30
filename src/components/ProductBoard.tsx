import { Button, TextField } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useRef, useState } from "react";
import { Form, FormikProps } from "formik";
import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
  StyledModal,
} from "./DashboardItems";
import ProductTable from "./ProductTable";
import styled from "styled-components";
import { SERVER_URL } from "@/consts/url";

const fileTypes = ["JPG", "PNG"];

const StyledProductBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > .header {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: end;
    justify-content: end;
  }
`;

const ProductCreateModal = ({ open, handleModalClose, formik }) => {
  const productIdRefs = useRef<HTMLInputElement>(null);
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

  return (
    <StyledModal open={open} onClose={handleModalClose}>
      <ProductAddModal>
        <h2>Add</h2>
        <ProductInput label="Product ID" name="productId" formik={formik} />
        <FileUploader
          handleChange={handleChangeFile}
          name="file"
          types={fileTypes}
        />
        {formik.values.image !== null && <div>{formik.values.image.name}</div>}
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
            onClick={() => {
              formik.handleSubmit();
              productIdRefs.current && productIdRefs.current.focus();
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleModalClose}>Cancel</Button>
        </StyledFlexDiv>
      </ProductAddModal>
    </StyledModal>
  );
};

const ProductBoard = ({ formik }: { formik: FormikProps<any> }) => {
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState([]);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getProductList = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/products`, {
          method: "GET",
        });
        const data = await res.json();
        setProductList(data);
      } catch (e) {
        console.log(e);
      }
    };

    getProductList();
  }, []);

  return (
    <StyledProductBoard>
      <div className="header">
        <Button>Delete</Button>
        <Button onClick={handleModalOpen}>Add</Button>
      </div>
      <ProductTable productList={productList} />
      <ProductCreateModal
        open={open}
        handleModalClose={handleModalClose}
        formik={formik}
      />
    </StyledProductBoard>
  );
};

export default ProductBoard;
