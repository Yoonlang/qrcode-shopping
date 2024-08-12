import { atom } from "recoil";

export interface imageUrlList {
  [productId: string]: string;
}

export const imageUrlListState = atom<imageUrlList>({
  key: "imageUrlListState",
  default: {},
});
