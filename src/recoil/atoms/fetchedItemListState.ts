import { atom, selector } from "recoil";

import { getProductList } from "@/api";
import { ProductType } from "@/const";

export const fetchedItemListCounter = atom<number>({
  key: "fetchedItemListCounter",
  default: 0,
});

export const fetchedItemListSelector = selector<ProductType[]>({
  key: "fetchedItemListSelector",
  get: async ({ get }) => {
    get(fetchedItemListCounter);

    const getProductListPromise = () =>
      new Promise<ProductType[]>((resolve, reject) => {
        getProductList(
          (data) => resolve(data),
          (e) => reject(e)
        );
      });

    return await getProductListPromise();
  },
});
