import { atom } from "recoil";

import { localStorageEffect } from "@/recoil/effects/localStorageEffect";

interface SelectedInfoListType {
  [productId: string]: { [key: string]: number };
}

export const selectedInfoListState = atom<SelectedInfoListType>({
  key: "selectedInfoListState",
  default: {},
  effects: [localStorageEffect<SelectedInfoListType>("selectedInfoListState")],
});
