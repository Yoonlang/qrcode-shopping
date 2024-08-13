import { FailCallback, SucceedResponse, SuccessCallback } from "@/api/const";
import { putProduct } from "@/api/products";
import { putUser } from "@/api/users";
import { Product, User } from "@/const";
import {
  transformProductForFolderUpdate,
  transformUserForUpdate,
} from "@/services/util";

export const reassignFolder = (
  dataList: User[] | Product[],
  folderId: string,
  onSuccess: SuccessCallback<SucceedResponse[] | Product[]>,
  onFail: FailCallback
) => {
  const promises: Promise<SucceedResponse | Product>[] = [];
  dataList.forEach((d: User | Product) => {
    promises.push(
      new Promise((resolve, reject) => {
        "productId" in d
          ? putProduct(
              transformProductForFolderUpdate(d, folderId),
              resolve,
              reject,
              d.productId
            )
          : putUser(
              transformUserForUpdate(d, folderId),
              resolve,
              reject,
              d.userId
            );
      })
    );
  });
  return Promise.all(promises).then(onSuccess).catch(onFail);
};
