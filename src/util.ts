import { OrdererInfo, Product } from "@/const";

export const transformProductForFolderUpdate = (
  product: Product,
  folderId: string
): FormData => {
  const formData = new FormData();
  formData.append("colors", JSON.stringify(product.colors));
  formData.append("composition", JSON.stringify(product.composition));
  formData.append("price", JSON.stringify(product.price));
  formData.append("weightGPerM2", JSON.stringify(product.weightGPerM2));
  formData.append("widthInch", JSON.stringify(product.widthInch));
  formData.append("folderId", JSON.stringify(folderId));
  formData.append("image", "null");
  formData.append("useSameImage", "true");
  return formData;
};

export const transformUserForFolderUpdate = (
  user: OrdererInfo,
  folderId: string
): string => {
  const { metadata, userId, ...rest } = user;
  const transformedData = {
    ...rest,
    folderId,
    submissionTime: metadata.submissionTime,
  };
  return JSON.stringify(transformedData);
};
