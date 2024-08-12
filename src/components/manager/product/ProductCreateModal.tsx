import { Button, TextField } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";

import { postProduct } from "@/api";
import MessageDialog from "@/components/common/MessageDialog";
import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
  StyledModal,
} from "@/components/manager/DashboardItems";
import {
  fileTypes,
  productCreationInitialValues,
  productCreationSchema,
} from "@/components/manager/product/const";
import { Folder } from "@/const";

const ProductCreateModal = ({
  folder,
  isModalOpen,
  onModalClose,
  onProductCreate,
}: {
  folder: Folder;
  isModalOpen: boolean;
  onModalClose: () => void;
  onProductCreate: () => void;
}) => {
  const overlay = useOverlay();

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
        folderId: folder.id,
      };

      const formData = new FormData();

      Object.entries(newForm).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      postProduct(
        formData,
        () => {
          resetForm();
          onProductCreate();
        },
        (e) => {
          overlay.open(({ isOpen, close }) => (
            <MessageDialog
              isDialogOpen={isOpen}
              onDialogClose={close}
              messageList={[e.message]}
            />
          ));
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
        <TextField
          label="Folder ID"
          name="folderId"
          value={folder.id}
          disabled
        />
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
