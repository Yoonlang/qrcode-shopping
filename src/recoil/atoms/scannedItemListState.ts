import { atom } from "recoil";

export interface ScannedItemList {
  [productId: string]: boolean;
}

export const scannedItemListState = atom<ScannedItemList>({
  key: "scannedItemListState",
  default: {},
});
