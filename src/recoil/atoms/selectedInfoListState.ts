import { atom } from "recoil";

export interface SelectedInfoList {
  [productId: string]: { [key: string]: number };
}

export const selectedInfoListState = atom<SelectedInfoList>({
  key: "selectedInfoListState",
  default: {},
});
