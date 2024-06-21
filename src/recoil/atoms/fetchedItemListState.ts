import { atom } from "recoil";

import { ProductType } from "@/components/ToBuyList/ToBuyItem/const";

export const fetchedItemListState = atom<ProductType[]>({
  key: "fetchedItemListState",
  default: [],
});
