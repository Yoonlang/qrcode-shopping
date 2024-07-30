import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";

import { putProduct } from "@/api";
import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
} from "@/components/Manager/DashboardItems";
import {
  fileTypes,
  productEditionInitialValues,
  productEditionSchema,
} from "@/components/Manager/Product/const";
import { Product } from "@/const";

const ProductEdit = ({
  product,
  onModalClose,
  onDetailModalOpen,
}: {
  product: Product;
  onModalClose: () => void;
  onDetailModalOpen: () => void;
}) => {
  const formik = useFormik({
    initialValues: productEditionInitialValues,
    validateOnMount: true,
    validationSchema: productEditionSchema,
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
        folderId: product.metadata.folderId,
        useSameImage: form.useSameImage,
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

      putProduct(
        formData,
        () => {
          resetForm();
        },
        (e) => {
          console.log(e);
        },
        product.productId
      );
    },
  });

  const colors = formik.values.colors;
  const colorRefs = useRef<HTMLInputElement[]>([]);

  const handleChangeFile = (file) => {
    formik.setFieldValue("image", file);
    formik.setFieldValue("useSameImage", false);
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
    if (colors.length > 0 && colorRefs.current[colors.length - 1]) {
      colorRefs.current[colors.length - 1].focus();
    }
  }, [colors.length]);

  useEffect(() => {
    const { image, colors, price, weightGPerM2, widthInch, composition } =
      product;
    formik.setFieldValue("method", "PUT");
    formik.setFieldValue("weightGPerM2", weightGPerM2);
    formik.setFieldValue("widthInch", widthInch);
    formik.setFieldValue("composition", composition);
    formik.setFieldValue("price", price);

    if (image) {
      formik.setFieldValue("image", new File([], ""));
    }

    const handledColors = colors.map(({ colorName }) => colorName);
    formik.setFieldValue("colors", handledColors);
  }, [product]);

  return (
    <ProductAddModal data-testid={"product-edit-modal"}>
      <h2>Edit</h2>
      <TextField
        label="Product ID"
        name="productId"
        value={product.productId}
        disabled
      />
      <FileUploader
        handleChange={handleChangeFile}
        name="file"
        types={fileTypes}
        disabled={formik.values.image}
      />
      {formik.values.image &&
        (formik.values.image.name ? (
          <div>{formik.values.image.name}</div>
        ) : (
          <Button
            onClick={() => {
              handleChangeFile(null);
            }}
          >
            기존 이미지 제거
          </Button>
        ))}
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
            formik.submitForm();
            onDetailModalOpen();
          }}
        >
          Confirm
        </Button>
        <Button onClick={onModalClose}>Cancel</Button>
      </StyledFlexDiv>
    </ProductAddModal>
  );
};

export default ProductEdit;
