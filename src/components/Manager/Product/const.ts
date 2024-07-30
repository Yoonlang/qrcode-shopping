import { GridColDef } from "@mui/x-data-grid";
import * as yup from "yup";

import {
  PRODUCT_DEFAULT,
  ProductCreationForm,
  ProductEditionForm,
} from "@/components/Manager/const";
import { Product } from "@/const";

export const fileTypes = ["JPG", "PNG"];

export const productCreationInitialValues: ProductCreationForm = {
  productId: "",
  image: null,
  colors: [""],
  composition: "",
  weightGPerM2: "",
  widthInch: "",
  price: null,
};

export const productCreationSchema = yup.object().shape({
  productId: yup.string().required(),
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
});

export const productEditionInitialValues: ProductEditionForm = {
  image: null,
  colors: [""],
  composition: "",
  weightGPerM2: "",
  widthInch: "",
  price: null,
  useSameImage: true,
};

export const productEditionSchema = yup.object().shape({
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

export const productDetailColumns: GridColDef[] = [
  { field: "sampleYardage", headerName: "Sample Yardage", width: 300 },
];

export const mockProductList: Product[] = [
  {
    productId: "JQ 12370SIQ",
    colors: [{ colorName: "", colorId: "1" }],
    composition: "",
    image: "",
    price: null,
    weightGPerM2: 64,
    widthInch: 58,
    metadata: {
      documentId: "JQ 12370SIQ",
      productId: "JQ 12370SIQ",
      folderId: PRODUCT_DEFAULT,
    },
  },
  {
    productId: "JQ 11370SIE",
    colors: [{ colorName: "", colorId: "1" }],
    composition: "",
    image: "",
    price: null,
    weightGPerM2: 64,
    widthInch: 58,
    metadata: {
      documentId: "JQ 11370SIE",
      productId: "JQ 11370SIE",
      folderId: PRODUCT_DEFAULT,
    },
  },
];

export type ProductTableRow = {
  id: string;
  __product__: Product;
};
