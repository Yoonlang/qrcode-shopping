import { atom, selector } from "recoil";

import { getProductList } from "@/api/products";
import { PRODUCT_TRASH_CAN } from "@/components/manager/const";
import { Product } from "@/const";

export const fetchedItemListCounter = atom<number>({
  key: "fetchedItemListCounter",
  default: 0,
});

export const fetchedItemListSelector = selector<Product[]>({
  key: "fetchedItemListSelector",
  get: async ({ get }) => {
    get(fetchedItemListCounter);

    try {
      const productList = await getProductList();
      return productList.filter(
        (product) => product.metadata.folderId !== PRODUCT_TRASH_CAN
      );
    } catch {
      // NOTE: 오류 발생 시 빈 배열 반환
      return [];
    }
  },
});
