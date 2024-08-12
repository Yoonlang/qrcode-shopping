import {
  ErrorProductExcel,
  ProductExcel,
  productExcelSchema,
  ProductTableRow,
} from "@/components/manager/product/const";
import { Folder, Product } from "@/const";

export const handleProductListForTable = (
  productList: Product[],
  folderList: Folder[]
): ProductTableRow[] => {
  return productList.map((product) => {
    const widthCm =
      product.widthInch !== null ? Math.floor(product.widthInch * 2.54) : null;
    const cuttableWidthInch =
      product.widthInch !== null ? product.widthInch - 3 : null;
    const cuttableWidthCm =
      cuttableWidthInch !== null ? Math.floor(cuttableWidthInch * 2.54) : null;
    const weightGPerY =
      product.weightGPerM2 !== null && product.widthInch !== null
        ? Math.floor(
            (product.weightGPerM2 * 0.9144 * 2.54 * product.widthInch) / 100
          )
        : null;

    return {
      id: product.productId,
      composition: product.composition,
      widthInch: product.widthInch,
      widthCm,
      cuttableWidthInch,
      cuttableWidthCm,
      weightGPerM2: product.weightGPerM2,
      weightGPerY,
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
