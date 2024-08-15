import { putProduct } from "@/api/products";
import { putUser } from "@/api/users";
import { Product, User } from "@/const";
import {
  transformProductForFolderUpdate,
  transformUserForUpdate,
} from "@/services/util";

export const reassignFolder = (
  dataList: User[] | Product[],
  folderId: string
) => {
  const promises = dataList.map((d: User | Product) => {
    return "productId" in d
      ? putProduct(transformProductForFolderUpdate(d, folderId), d.productId)
      : putUser(transformUserForUpdate(d, folderId), d.userId);
  });
  return Promise.all(promises);
};
