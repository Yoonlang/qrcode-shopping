import { GridColDef } from "@mui/x-data-grid";
import * as yup from "yup";

import {
  PRODUCT_DEFAULT,
  PRODUCT_TRASH_CAN,
  ProductCreationForm,
  ProductEditionForm,
} from "@/components/Manager/const";
import { Folder, Product } from "@/const";

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

export const mockProductFolderList: Folder[] = [
  {
    name: "전체",
    type: "product",
    id: PRODUCT_DEFAULT,
    creationTime: "2024-08-10 09:00:00",
  },
  {
    name: "휴지통",
    type: "product",
    id: PRODUCT_TRASH_CAN,
    creationTime: "2024-08-10 09:00:00",
  },
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
  composition: string | null;
  widthInch: number | null;
  widthCm: number | null;
  cuttableWidthInch: number | null;
  cuttableWidthCm: number | null;
  weightGPerM2: number | null;
  weightGPerY: number | null;
  folderId: string;
  folderName: string;
  __product__: Product;
};

export interface ProductExcel {
  __rowNum__: number;
  "유효폭 (Cm)": number | undefined;
  "유효폭 (Inch)": number | undefined;
  제품: string;
  조성: string;
  "중량 (G/M2)": number;
  "중량 (G/Y)": number | undefined;
  "폭 (Cm)": number | undefined;
  "폭 (Inch)": number;
}

type PartialWithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type ErrorProductExcel = PartialWithRequired<ProductExcel, "__rowNum__">;

export const productExcelSchema = yup
  .object()
  .shape({
    __rowNum__: yup.number().required(),
    "유효폭 (Cm)": yup.number(),
    "유효폭 (Inch)": yup.number(),
    제품: yup
      .string()
      .required()
      .matches(/^[^/]*$/),
    조성: yup.string().required(),
    "중량 (G/M2)": yup.number().required(),
    "중량 (G/Y)": yup.number(),
    "폭 (Cm)": yup.number(),
    "폭 (Inch)": yup.number().required(),
  })
  .noUnknown()
  .strict();
