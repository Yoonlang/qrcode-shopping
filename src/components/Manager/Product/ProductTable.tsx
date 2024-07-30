import { Button, TextField } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useOverlay } from "@toss/use-overlay";
import { useFormik } from "formik";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { styled } from "styled-components";
import * as yup from "yup";

import { putProduct } from "@/api";
import { ProductEditionForm } from "@/components/Manager/const";
import {
  ProductAddModal,
  ProductInput,
  StyledFlexDiv,
  StyledModal,
} from "@/components/Manager/DashboardItems";
import { Product } from "@/const";

const fileTypes = ["JPG", "PNG"];

const columns: GridColDef[] = [
  { field: "id", headerName: "Product ID", width: 200 },
];

const productDetailColumns: GridColDef[] = [
  { field: "sampleYardage", headerName: "Sample Yardage", width: 300 },
];

type ProductTableRow = {
  id: string;
  __product__: Product;
};

const handleProductListForTable = (
  productList: Product[]
): ProductTableRow[] => {
  return productList.map((product) => {
    return {
      id: product.productId,
      __product__: product,
    };
  });
};

const StyledDetailModalContainer = styled.div`
  position: relative;
  width: 730px;
  height: 520px;
  padding: 30px 30px 50px 30px;
  background-color: var(--color-white);

  .productContainer {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 20px;
    .baseInfo {
      display: flex;
      flex-direction: column;
      .imageContainer {
        min-width: 276px;
        min-height: 276px;
        > img {
          min-width: 276px;
          min-height: 276px;
        }
      }
      .productDetail {
        max-width: 276px;
        background-color: var(--color-gray-10);
        filter: drop-shadow(0 1px 2px var(--color-black));
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

export const ProductDetail = ({
  product,
  onModalClose,
  onEditModalOpen,
}: {
  product: Product;
  onModalClose: () => void;
  onEditModalOpen: () => void;
}) => {
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
          <div className="imageContainer">
            {image ? (
              <Image
                width={276}
                height={276}
                src={`${image ?? ""}`}
                loading="lazy"
                unoptimized
                alt={productId}
              />
            ) : (
              <>no image</>
            )}
          </div>
          <div className="productDetail">
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
        <Button
          onClick={onEditModalOpen}
          data-testid={"product-detail-open-edit-modal-button"}
        >
          수정
        </Button>
        <Button onClick={onModalClose}>닫기</Button>
      </div>
    </StyledDetailModalContainer>
  );
};

const productEditionInitialValues: ProductEditionForm = {
  image: null,
  colors: [""],
  composition: "",
  weightGPerM2: "",
  widthInch: "",
  price: null,
  useSameImage: true,
};

const productEditionSchema = yup.object().shape({
  image: yup
    .mixed()
    .nullable()
    .test("fileType", (value) => {
      if (!value) return true;
      return (
        value instanceof File &&
        ["image/jpeg", "image/png"].includes(value.type)
      );
    }),
  colors: yup.array().of(yup.string()),
  composition: yup.string().defined(),
  weightGPerM2: yup.string().defined(),
  widthInch: yup.string().defined(),
  price: yup.number().required().nullable(),
  useSameImage: yup.boolean().required(),
});

export const ProductEdit = ({
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

export const ProductDetailModal = ({
  isModalOpen,
  onModalClose,
  modalProductData,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
  modalProductData: Product;
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
      onClose={onModalClose}
      data-testid={"product-detail-modal"}
    >
      {isEditMode ? (
        <ProductEdit
          product={modalProductData}
          onModalClose={onModalClose}
          onDetailModalOpen={openDetailModal}
        />
      ) : (
        <ProductDetail
          product={modalProductData}
          onModalClose={onModalClose}
          onEditModalOpen={openEditModal}
        />
      )}
    </StyledModal>
  );
};

const ProductTable = ({
  productList,
  setSelectedProductList,
}: {
  productList: Product[];
  setSelectedProductList: Dispatch<SetStateAction<string[]>>;
}) => {
  const tableRows = handleProductListForTable(productList);
  const overlay = useOverlay();

  // formik 커밋 이후 수정할 예정
  // useEffect(() => {
  //   if (!isModalOpen) {
  //     formik.resetForm();
  //   }
  // }, [isModalOpen]);

  return (
    <>
      <div style={{ height: "calc(100% - 60px)", width: "100%" }}>
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
          onRowSelectionModelChange={(selectedList: string[]) => {
            setSelectedProductList(selectedList);
          }}
          onCellClick={(cell: GridCellParams<ProductTableRow>, e) => {
            if (cell.field !== "__check__") {
              e.stopPropagation();
              overlay.open(({ isOpen, close }) => (
                <ProductDetailModal
                  isModalOpen={isOpen}
                  onModalClose={close}
                  modalProductData={cell.row.__product__}
                />
              ));
            }
          }}
        />
      </div>
    </>
  );
};

export default ProductTable;
