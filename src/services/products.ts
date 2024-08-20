import { deleteProduct } from "@/api/products";

export const deleteProductList = (productList: string[]) => {
  const deletePromises = productList.map((productId) => {
    return deleteProduct(undefined, productId);
  });

  return Promise.all(deletePromises);
};
