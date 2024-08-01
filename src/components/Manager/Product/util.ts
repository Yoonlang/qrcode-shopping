import { ProductTableRow } from "@/components/Manager/Product/const";
import { Folder, Product } from "@/const";

export const handleProductListForTable = (
  productList: Product[],
  folderList: Folder[]
): ProductTableRow[] => {
  return productList.map((product) => {
    return {
      id: product.productId,
      folderId: product.metadata.folderId,
      folderName:
        folderList.find((f) => f.id === product.metadata.folderId)?.name ??
        "Not Found",
      __product__: product,
    };
  });
};
