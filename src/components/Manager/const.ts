import { Folder } from "@/const";

export interface ProductFormType {
  productId: string;
  image: File | null;
  colors: string[];
  composition: string;
  weightGPerM2: string;
  widthInch: string;
  price: number | null;
  method: string;
}

export const initialValues = {
  productId: "",
  image: null,
  colors: [""],
  composition: "",
  weightGPerM2: "",
  widthInch: "",
  price: null,
  method: "POST",
};

export const initialFolderList: Folder[] = [
  {
    name: "전체",
    type: "user",
    id: "user-default",
    creationTime: "2024-07-18 17:06",
  },
  {
    name: "휴지통",
    type: "user",
    id: "user-trash-can",
    creationTime: "2024-07-18 17:06",
  },
  {
    name: "전체",
    type: "product",
    id: "product-default",
    creationTime: "2024-07-18 17:06",
  },
  {
    name: "휴지통",
    type: "product",
    id: "product-trash-can",
    creationTime: "2024-07-18 17:06",
  },
];
