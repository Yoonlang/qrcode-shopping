import {
  ApiGetFunction,
  ApiModifyFunction,
  FailCallback,
  SucceedResponse,
  SuccessCallback,
} from "@/api/const";
import http from "@/api/http";
import { deleteProduct, putProduct } from "@/api/products";
import {
  transformProductForFolderUpdate,
  transformUserForUpdate,
} from "@/api/util";
import { Folder, Product, User } from "@/const";

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

export const getUserList: ApiGetFunction<User[]> = (onSuccess, onFail) => {
  return http.get(`/users`, { credentials: "include" }, onSuccess, onFail);
};

export const submitUser: ApiModifyFunction<User> = (
  body,
  onSuccess,
  onFail
) => {
  return http.post(`/users`, undefined, body, onSuccess, onFail);
};

const putUser: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.put(
    `/users/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
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

const deleteOrderer: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.delete(
    `/users/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};

export const permanentDeleteOrdererList = (
  ordererList: string[],
  onSuccess: SuccessCallback<SucceedResponse[]>,
  onFail: FailCallback
) => {
  const deletePromises: Promise<SucceedResponse>[] = ordererList.map(
    (ordererId) => {
      return new Promise((resolve, reject) => {
        deleteOrderer(undefined, resolve, reject, ordererId);
      });
    }
  );

  return Promise.all(deletePromises).then(onSuccess).catch(onFail);
};

export const getFolderList: ApiGetFunction<Folder[]> = (onSuccess, onFail) => {
  return http.get(`/folders`, { credentials: "include" }, onSuccess, onFail);
};

export const postFolder: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail
) => {
  return http.post(
    `/folders`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};

export const patchFolder: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.patch(
    `/folders/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};

export const deleteFolder: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.delete(
    `/folders/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};

export const getText: ApiGetFunction<{ text: string }> = (
  onSuccess,
  onFail
) => {
  return http.get(`/text`, undefined, onSuccess, onFail);
};

export const putText: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail
) => {
  return http.put(`/text`, { credentials: "include" }, body, onSuccess, onFail);
};

export const checkCookieAuth: ApiGetFunction<SucceedResponse> = (
  onSuccess,
  onFail
) => {
  return http.get(`/cookie`, { credentials: "include" }, onSuccess, onFail);
};

export const postLogin: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail
) => {
  return http.post(
    `/login`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};
