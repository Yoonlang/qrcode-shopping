import {
  ErrorProductExcel,
  ProductExcel,
  productExcelSchema,
  ProductTableRow,
} from "@/components/Manager/Product/const";
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

export const handleExcelFileProductList = async (
  productExcelList: ProductExcel[],
  productList: Product[]
): Promise<{
  newProductList: ProductExcel[];
  existingProductList: ProductExcel[];
  errorProductList: ErrorProductExcel[];
}> => {
  const processProductList = async () => {
    const newProductList: ProductExcel[] = [];
    const existingProductList: ProductExcel[] = [];
    const errorProductList: ErrorProductExcel[] = [];
    for (const pe of productExcelList) {
      try {
        await productExcelSchema.validate(pe);
        if (productList.find((p) => p.productId === pe["제품"])) {
          existingProductList.push(pe);
        } else {
          newProductList.push(pe);
        }
      } catch (e) {
        errorProductList.push(pe);
      }
    }
    return {
      newProductList,
      existingProductList,
      errorProductList,
    };
  };

  return processProductList();
};
