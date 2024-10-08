import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";

import { putProduct } from "@/api/products";
import MessageDialog from "@/components/common/MessageDialog";
import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
  StyledModal,
} from "@/components/manager/DashboardItems";
import {
  fileTypes,
  productEditionInitialValues,
  productEditionSchema,
} from "@/components/manager/product/const";
import { OverlayControl, Product } from "@/const";
import { useMultipleOverlay } from "@/hooks/useOverlay";

const ProductEditModal = ({
  overlayControl,
  product,
  onProductUpdate,
}: {
  overlayControl: OverlayControl;
  product: Product;
  onProductUpdate: (updatedProduct: Product) => void | Promise<void>;
}) => {
  const overlays = useMultipleOverlay(2);
  const formik = useFormik({
    initialValues: productEditionInitialValues,
    validateOnMount: true,
    validationSchema: productEditionSchema,
    onSubmit: async (form) => {
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
        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      try {
        const res = await putProduct(formData, product.productId);
        await onProductUpdate(res);
        overlayControl.exit();
      } catch (e) {
        overlays[1].open((control) => (
          <MessageDialog overlayControl={control} messageList={[e.message]} />
        ));
      }
    },
  });

  const colors = formik.values.colors;
  const colorRefs = useRef<HTMLInputElement[]>([]);

  const handleChangeFile = (file) => {
    void formik.setFieldValue("image", file);
    void formik.setFieldValue("useSameImage", false);
  };

  const handleAddColor = () => {
    const newColors = [...formik.values.colors, ""];
    void formik.setFieldValue("colors", newColors);
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
    void formik.setFieldValue("colors", newColors);
  };

  useEffect(() => {
    if (colors.length > 0 && colorRefs.current[colors.length - 1]) {
      colorRefs.current[colors.length - 1].focus();
    }
  }, [colors.length]);

  useEffect(() => {
    const { image, colors, price, weightGPerM2, widthInch, composition } =
      product;

    void formik.setFieldValue("method", "PUT");
    void formik.setFieldValue("weightGPerM2", weightGPerM2);
    void formik.setFieldValue("widthInch", widthInch);
    void formik.setFieldValue("composition", composition);
    void formik.setFieldValue("price", price);
    if (image) {
      void formik.setFieldValue("image", new File([], ""));
    }
    const handledColors = colors.map(({ colorName }) => colorName);
    void formik.setFieldValue("colors", handledColors);
  }, [product]);

  return (
    <StyledModal open={overlayControl.isOpen} onClose={overlayControl.exit}>
      <ProductAddModal data-testid={"product-edit-modal"}>
        <h2>Edit</h2>
        <TextField
          label="Product ID"
          name="productId"
          value={product.productId}
          disabled
        />
        <TextField
          label="Folder ID"
          name="folderId"
          value={product.metadata.folderId}
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
            onClick={async () => {
              await formik.submitForm();
            }}
          >
            Confirm
          </Button>
          <Button onClick={overlayControl.exit}>Cancel</Button>
        </StyledFlexDiv>
      </ProductAddModal>
    </StyledModal>
  );
};

export default ProductEditModal;
