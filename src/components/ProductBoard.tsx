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

const StyledProductBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductBoard = ({ formik }: { formik: FormikProps<any> }) => {
  const [open, setOpen] = useState(false);
  const colors = formik.values.colors;
  const fileTypes = ["JPG", "PNG"];
  const colorRefs = useRef<HTMLInputElement[]>([]);
  const productIdRefs = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      colors.length > 0 &&
      colorRefs.current[colors.length - 1] &&
      formik.values.productId !== ""
    ) {
      colorRefs.current[colors.length - 1].focus();
    }
  }, [colors.length]);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleDeleteColor = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newColors = [...formik.values.colors];
    newColors.splice(index, 1);
    formik.setFieldValue("colors", newColors);
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

  const handleChangeFile = (file) => {
    formik.setFieldValue("image", file);
  };

  return (
    <StyledProductBoard>
      <Button onClick={handleModalOpen}>Add</Button>
      <StyledModal open={open} onClose={handleModalClose}>
        <ProductAddModal>
          <h2>Add</h2>
          <ProductInput label="Product ID" name="productId" formik={formik} />
          <FileUploader
            handleChange={handleChangeFile}
            name="file"
            types={fileTypes}
          />
          {formik.values.image !== null && (
            <div>{formik.values.image.name}</div>
          )}
          <ProductInput
            label="Composition"
            name="composition"
            formik={formik}
          />
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
      <ProductTable />
    </StyledProductBoard>
  );
};

export default ProductBoard;
