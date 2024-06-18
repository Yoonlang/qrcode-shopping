import { atom } from "recoil";

interface SelectedInfoType {
  [productId: string]: { [key: string]: number };
}

export const selectedInfoState = atom<SelectedInfoType>({
  key: "selectedInfoState",
  default: {},
});
