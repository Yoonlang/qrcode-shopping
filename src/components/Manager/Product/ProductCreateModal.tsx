import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";

import { postProduct } from "@/api";
import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
  StyledModal,
} from "@/components/Manager/DashboardItems";
import {
  fileTypes,
  productCreationInitialValues,
  productCreationSchema,
} from "@/components/Manager/Product/const";

const ProductCreateModal = ({
  isModalOpen,
  onModalClose,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
}) => {
  const formik = useFormik({
    initialValues: productCreationInitialValues,
    validationSchema: productCreationSchema,
    onSubmit: (form, { resetForm }) => {
      const newForm = {
        ...form,
        colors: form.colors.map((color, index) => {
          return {
            colorId: (index + 1).toString(),
            colorName: color,
          };
        }),
        weightGPerM2: Number(form["weightGPerM2"]),
        widthInch: Number(form["widthInch"]),
      };

      const formData = new FormData();

      Object.entries(newForm).forEach(([key, value]) => {
        if (key === "image") {
          if (value instanceof File) {
            formData.append(key, value);
          } else if ((value as never as boolean) === true) {
            formData.append(key, "null");
          } else {
            formData.append(key, "null");
          }
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      postProduct(
        formData,
        () => {
          resetForm();
        },
        (e) => {
          console.log(e);
        }
      );
    },
  });
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
    <StyledModal open={isModalOpen} onClose={onModalClose}>
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
          <Button onClick={onModalClose}>Cancel</Button>
        </StyledFlexDiv>
      </ProductAddModal>
    </StyledModal>
  );
};

export default ProductCreateModal;
