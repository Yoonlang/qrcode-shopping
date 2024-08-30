import { Folder } from "@/const";

export interface ProductCreationForm {
  productId: string;
  image: File | null;
  colors: string[];
  composition: string;
  weightGPerM2: string;
  widthInch: string;
  price: number | null;
}

export interface ProductEditionForm {
  image: File | null;
  colors: string[];
  composition: string;
  weightGPerM2: string;
  widthInch: string;
  price: number | null;
  useSameImage: boolean;
}

type StringKeyList<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type ProductCreationStringKeyList = StringKeyList<ProductCreationForm>;
export type ProductEditionStringKeyList = StringKeyList<ProductEditionForm>;

export const USER_DEFAULT = "user-default";
export const USER_TRASH_CAN = "user-trash-can";
export const PRODUCT_DEFAULT = "product-default";
export const PRODUCT_TRASH_CAN = "product-trash-can";

export const initialFolderList: Folder[] = [
  {
    name: "전체",
    type: "user",
    id: USER_DEFAULT,
    creationTime: "2024-07-18 17:06",
  },
  {
    name: "휴지통",
    type: "user",
    id: USER_TRASH_CAN,
    creationTime: "2024-07-18 17:06",
  },
  {
    name: "전체",
    type: "product",
    id: PRODUCT_DEFAULT,
    creationTime: "2024-07-18 17:06",
  },
  {
    name: "휴지통",
    type: "product",
    id: PRODUCT_TRASH_CAN,
    creationTime: "2024-07-18 17:06",
  },
];
