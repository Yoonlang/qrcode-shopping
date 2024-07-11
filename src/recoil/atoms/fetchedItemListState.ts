import { atom, selector } from "recoil";

import { getProductList } from "@/api";
import { Product } from "@/const";

export const fetchedItemListCounter = atom<number>({
  key: "fetchedItemListCounter",
  default: 0,
});

export const fetchedItemListSelector = selector<Product[]>({
  key: "fetchedItemListSelector",
  get: async ({ get }) => {
    get(fetchedItemListCounter);

    const getProductListPromise = () =>
      new Promise<Product[]>((resolve, reject) => {
        getProductList(
          (data) => resolve(data),
          (e) => reject(e)
        );
      });

    return await getProductListPromise();
  },
});
