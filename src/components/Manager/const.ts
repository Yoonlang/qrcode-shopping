import { Folder } from "@/const";

export interface ProductFormType {
  productId: string;
  image: File | null;
  colors: string[];
  composition: string;
  weightGPerM2: string;
  widthInch: string;
  price: number | null;
  useSameImage: boolean;
}

export const initialValues: ProductFormType = {
  productId: "",
  image: null,
  colors: [""],
  composition: "",
  weightGPerM2: "",
  widthInch: "",
  price: null,
  useSameImage: false,
};

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
