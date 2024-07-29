import { Button, TextField } from "@mui/material";
import { useOverlay } from "@toss/use-overlay";
import { FormikProps } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { styled } from "styled-components";

import {
  getProductList,
  permanentDeleteProductList,
  reassignFolder,
} from "@/api";
import {
  PRODUCT_DEFAULT,
  PRODUCT_TRASH_CAN,
  ProductFormType,
} from "@/components/Manager/const";
import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
  StyledModal,
} from "@/components/Manager/DashboardItems";
import DataFolderReassignModal from "@/components/Manager/Folder/DataFolderReassignModal";
import ProductTable from "@/components/Manager/Product/ProductTable";
import MessageDialog from "@/components/MessageDialog";
import { Folder, Product } from "@/const";

const fileTypes = ["JPG", "PNG"];

const StyledProductBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > .header {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
`;

const ProductCreateModal = ({
  open,
  handleModalClose,
  formik,
}: {
  open: boolean;
  handleModalClose: () => void;
  formik: FormikProps<ProductFormType>;
}) => {
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

const ProductBoard = ({
  folder,
  productFolderList,
  formik,
}: {
  folder: Folder;
  productFolderList: Folder[];
  formik: FormikProps<ProductFormType>;
}) => {
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const filteredProductList = productList.filter((p) => {
    if (folder.id === PRODUCT_DEFAULT) {
      return p.metadata.folderId !== PRODUCT_TRASH_CAN;
    }
    return p.metadata.folderId === folder.id;
  });
  const [selectedProductList, setSelectedProductList] = useState<string[]>([]);
  const overlay = useOverlay();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const updateProductList = () => {
    getProductList(
      (data) => {
        setProductList(data);
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 가져오기 실패"]}
          />
        ));
      }
    );
  };

  const handleProductRestore = () => {
    reassignFolder(
      filteredProductList.filter((f) =>
        selectedProductList.find((productId) => f.productId === productId)
      ),
      PRODUCT_DEFAULT,
      () => {
        updateProductList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 복구 실패"]}
          />
        ));
      }
    );
  };

  const handleProductSoftDelete = () => {
    reassignFolder(
      filteredProductList.filter((f) =>
        selectedProductList.find((productId) => f.productId === productId)
      ),
      PRODUCT_TRASH_CAN,
      () => {
        updateProductList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 삭제 실패"]}
          />
        ));
      }
    );
  };

  const handleProductPermanentDelete = () => {
    permanentDeleteProductList(
      selectedProductList,
      () => {
        updateProductList();
      },
      () => {
        overlay.open(({ isOpen, close }) => (
          <MessageDialog
            isDialogOpen={isOpen}
            onDialogClose={close}
            messageList={["데이터 영구 삭제 실패"]}
          />
        ));
      }
    );
  };

  const handleProductFolderReassign = () => {
    if (selectedProductList.length > 0) {
      overlay.open(({ isOpen, close }) => (
        <DataFolderReassignModal
          isModalOpen={isOpen}
          onModalClose={close}
          selectedDataList={filteredProductList.filter((f) =>
            selectedProductList.find((productId) => f.productId === productId)
          )}
          folder={folder}
          folderList={productFolderList}
          onReassignComplete={() => {
            updateProductList();
          }}
        />
      ));
    }
  };

  const cachedFormikSubmit = useMemo(() => {
    return formik.isSubmitting;
  }, [formik.isSubmitting]);

  useEffect(() => {
    if (!cachedFormikSubmit) {
      updateProductList();
    }
  }, [cachedFormikSubmit]);

  return (
    <StyledProductBoard>
      <div className="header">
        <h3>product / {folder.name}</h3>
        <div>
          {folder.id === PRODUCT_TRASH_CAN ? (
            <>
              <Button onClick={handleProductRestore}>데이터 복구</Button>
              <Button onClick={handleProductPermanentDelete}>
                데이터 영구 삭제
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleProductFolderReassign}>
                데이터 폴더 이동
              </Button>
              <Button onClick={handleModalOpen}>데이터 추가</Button>
              <Button onClick={handleProductSoftDelete}>데이터 삭제</Button>
            </>
          )}
        </div>
      </div>
      <ProductTable
        productList={filteredProductList}
        setSelectedProductList={setSelectedProductList}
        formik={formik}
      />
      <ProductCreateModal
        open={open}
        handleModalClose={handleModalClose}
        formik={formik}
      />
    </StyledProductBoard>
  );
};

export default ProductBoard;
