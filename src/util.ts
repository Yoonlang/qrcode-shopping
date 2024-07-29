import { PRODUCT_TRASH_CAN, USER_TRASH_CAN } from "@/components/Manager/const";
import { OrdererInfo, Product } from "@/const";

export const transformProductToSoftDeleteFormat = (
  product: Product
): FormData => {
  const formData = new FormData();
  formData.append("colors", JSON.stringify(product.colors));
  formData.append("composition", JSON.stringify(product.composition));
  formData.append("price", JSON.stringify(product.price));
  formData.append("weightGPerM2", JSON.stringify(product.weightGPerM2));
  formData.append("widthInch", JSON.stringify(product.widthInch));
  formData.append("folderId", JSON.stringify(PRODUCT_TRASH_CAN));
  formData.append("image", "null");
  formData.append("useSameImage", "true");
  return formData;
};

export const transformUserToSoftDeleteFormat = (user: OrdererInfo): string => {
  const { metadata, userId, ...rest } = user;
  const transformedData = {
    ...rest,
    folderId: USER_TRASH_CAN,
    submissionTime: metadata.submissionTime,
  };
  return JSON.stringify(transformedData);
};
