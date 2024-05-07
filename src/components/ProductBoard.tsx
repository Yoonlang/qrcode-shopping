import { Button, TextField } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { FormikProps } from "formik";
import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
  StyledModal,
} from "./DashboardItems";

const ProductBoard = ({ formik }: { formik: FormikProps<any> }) => {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [currColor, setCurrColor] = useState("");
  const fileTypes = ["JPG", "PNG"];

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleChangeColorInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newColors = [...colors];
    newColors[index] = e.target.value;
    setColors(newColors);
  };

  const handleDeleteColor = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
    formik.setFieldValue(
      "colors",
      newColors.map((color, idx) => {
        return { colorId: (idx + 1).toString(), colorName: color };
      })
    );
  };

  const handleChangeCurrColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrColor(e.target.value);
  };

  const handleAddColor = () => {
    const newColors = [...colors, currColor];
    setColors(newColors);
    setCurrColor("");
    formik.setFieldValue(
      "colors",
      newColors.map((color, idx) => {
        return { colorId: (idx + 1).toString(), colorName: color };
      })
    );
  };

  const handleChangeFile = (file) => {
    formik.setFieldValue("image", file.name);
  };

  return (
    <>
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
          {formik.values.image !== "" && <div>{formik.values.image}</div>}
          <ProductInput
            label="Composition"
            name="composition"
            formik={formik}
          />
          <ProductInput label="Weight" name="weightGPerM2" formik={formik} />
          <ProductInput label="Width" name="widthInch" formik={formik} />
          {colors.length > 0 &&
            colors.map((color, index) => (
              <StyledFlexDiv key={color}>
                <TextField
                  label="Sample Yardage"
                  onChange={(e) => handleChangeColorInput(e, index)}
                  value={color}
                  fullWidth
                />
                <Button onClick={(e) => handleDeleteColor(e, index)}>
                  Delete
                </Button>
              </StyledFlexDiv>
            ))}
          <StyledFlexDiv>
            <TextField
              label="Sample Yardage"
              onChange={handleChangeCurrColor}
              value={currColor}
              fullWidth
            />
            <Button onClick={handleAddColor}>Add</Button>
          </StyledFlexDiv>
          <StyledFlexDiv>
            <Button onClick={() => formik.handleSubmit()}>Confirm</Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </StyledFlexDiv>
        </ProductAddModal>
      </StyledModal>
    </>
  );
};

export default ProductBoard;
