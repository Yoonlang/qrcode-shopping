import { ProductTableRow } from "@/components/Manager/Product/const";
import { Product } from "@/const";


export const handleProductListForTable = (
  productList: Product[]
): ProductTableRow[] => {
  return productList.map((product) => {
    return {
      id: product.productId,
      __product__: product,
    };
  });
};
