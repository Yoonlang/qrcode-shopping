import { localStorageEffect } from "@/recoil/effects/localStorageEffect";
import { atom } from "recoil";

interface SelectedInfoListType {
  [productId: string]: { [key: string]: number };
}

export const selectedInfoListState = atom<SelectedInfoListType>({
  key: "selectedInfoListState",
  default: {},
  effects: [localStorageEffect<SelectedInfoListType>("selectedInfoListState")],
});
