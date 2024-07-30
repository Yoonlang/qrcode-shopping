import { ProductTableRow } from "@/components/Manager/Product/const";
import { Folder, Product } from "@/const";

export const handleProductListForTable = (
  productList: Product[],
  folder: Folder
): ProductTableRow[] => {
  return productList.map((product) => {
    return {
      id: product.productId,
      folderId: folder.id,
      folderName: folder.name,
      __product__: product,
    };
  });
};
