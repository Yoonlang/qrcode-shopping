import { atom } from "recoil";

import { localStorageEffect } from "@/recoil/effects/localStorageEffect";

export const scannedItemListState = atom({
  key: "scannedItemListState",
  default: [],
  effects: [localStorageEffect<Object>("scannedItemList")],
});
