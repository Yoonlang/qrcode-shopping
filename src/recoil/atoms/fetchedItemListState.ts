import { selector } from "recoil";

import { ProductType } from "@/components/ToBuyList/ToBuyItem/const";
import { getProductList } from "@/api";

export const fetchedItemListSelector = selector<ProductType[]>({
  key: "fetchedItemListSelector",
  get: async () => {
    try {
      const getProductListPromise = () =>
        new Promise<ProductType[]>((resolve, reject) => {
          return getProductList(
            (data) => resolve(data),
            (e) => reject(e)
          );
        });
      return await getProductListPromise();
    } catch (e) {
      console.log(e);
      return [];
    }
  },
});
