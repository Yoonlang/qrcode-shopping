import { FailCallback, SucceedResponse, SuccessCallback } from "@/api/const";
import { deleteProduct } from "@/api/products";

export const permanentDeleteProductList = (
  productList: string[],
  onSuccess: SuccessCallback<SucceedResponse[]>,
  onFail: FailCallback
) => {
  const deletePromises = productList.map((productId) => {
    return new Promise((resolve, reject) => {
      deleteProduct(undefined, resolve, reject, productId);
    });
  });

  return Promise.all(deletePromises).then(onSuccess).catch(onFail);
};
