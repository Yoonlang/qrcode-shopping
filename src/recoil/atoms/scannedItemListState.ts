import { atom } from "recoil";
import { localStorageEffect } from "../effects/localStorageEffect";

export const scannedItemListState = atom({
  key: "scannedItemListState",
  default: [],
  effects: [localStorageEffect<Object>("scannedItemList")],
});
