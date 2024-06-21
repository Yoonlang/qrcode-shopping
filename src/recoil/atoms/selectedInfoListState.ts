import { atom } from "recoil";

import { localStorageEffect } from "@/recoil/effects/localStorageEffect";

interface SelectedInfoList {
  [productId: string]: { [key: string]: number };
}

export const selectedInfoListState = atom<SelectedInfoList>({
  key: "selectedInfoListState",
  default: {},
  effects: [localStorageEffect<SelectedInfoList>("selectedInfoListState")],
});
