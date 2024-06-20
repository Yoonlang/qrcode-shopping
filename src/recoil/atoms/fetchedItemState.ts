import { atom } from "recoil";

import { ProductType } from "@/components/ToBuyList/ToBuyItem/const";

export const fetchedItemState = atom<ProductType[]>({
  key: "fetchedItemState",
  default: [],
});
