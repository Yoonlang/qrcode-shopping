import { FailCallback, SucceedResponse, SuccessCallback } from "@/api/const";
import { deleteProduct, putProduct } from "@/api/products";
import { deleteUser, putUser } from "@/api/users";
import {
  transformProductForFolderUpdate,
  transformUserForUpdate,
} from "@/api/util";
import { Product, User } from "@/const";

export const permanentDeleteProductList = (
  productList: string[],
  onSuccess: SuccessCallback<SucceedResponse[]>,
  onFail: FailCallback
) => {
  const deletePromises = productList.map((productId) => {
    return new Promise((resolve, reject) => {
      deleteProduct(undefined, resolve, reject, productId);
    });
  });

  return Promise.all(deletePromises).then(onSuccess).catch(onFail);
};

export const editUserRemark = (
  user: User,
  onSuccess: SuccessCallback<SucceedResponse>,
  onFail: FailCallback
) => {
  return putUser(transformUserForUpdate(user), onSuccess, onFail, user.userId);
};

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

export const permanentDeleteOrdererList = (
  ordererList: string[],
  onSuccess: SuccessCallback<SucceedResponse[]>,
  onFail: FailCallback
) => {
  const deletePromises: Promise<SucceedResponse>[] = ordererList.map(
    (ordererId) => {
      return new Promise((resolve, reject) => {
        deleteUser(undefined, resolve, reject, ordererId);
      });
    }
  );

  return Promise.all(deletePromises).then(onSuccess).catch(onFail);
};
