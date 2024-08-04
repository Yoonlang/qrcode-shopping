import { SERVER_URL } from "@/components/const";
import { Folder, OrdererInfo, Product } from "@/const";
import {
  transformProductForFolderUpdate,
  transformUserForUpdate,
} from "@/util";

const API_VERSION = "/v1";

interface SucceedResponse {
  message: string;
}

interface ErrorResponse {
  error: string;
}

type SuccessCallback<T> = (data: T) => void;
type FailCallback = (error: Error) => void;

type ApiGetFunction<T> = (
  onSuccess: SuccessCallback<T>,
  onFail: FailCallback,
  targetId?: string
) => Promise<void>;

type ApiModifyFunction<T> = (
  body: BodyInit | null | undefined,
  onSuccess: SuccessCallback<T>,
  onFail: FailCallback,
  targetId?: string
) => Promise<void>;

const isErrorResponse = (data: unknown): data is ErrorResponse => {
  return typeof data === "object" && data !== null && "error" in data;
};

const handleResponse = <T>(res: Response): Promise<T> =>
  res.json().then((data: T | ErrorResponse) => {
    if (!res.ok && isErrorResponse(data)) {
      throw new Error(data.error);
    }
    return data as T;
  });

const http = {
  get: <T>(
    path: string,
    options = {},
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "GET",
      ...options,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  post: <T>(
    path: string,
    options = {},
    body: BodyInit | null | undefined,
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  put: <T>(
    path: string,
    options = {},
    body: BodyInit | null | undefined,
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  patch: <T>(
    path: string,
    options = {},
    body: BodyInit | null | undefined,
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  delete: <T>(
    path: string,
    options = {},
    body: BodyInit | null | undefined,
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
};

export const getProductList: ApiGetFunction<Product[]> = (
  onSuccess,
  onFail
) => {
  return http.get(`/products`, undefined, onSuccess, onFail);
};

export const postProduct: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail
) => {
  return http.post(
    `/products`,
    { credentials: "include", headers: {} },
    body,
    onSuccess,
    onFail
  );
};

export const putProduct: ApiModifyFunction<Product> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.put(
    `/products/${targetId}`,
    { credentials: "include", headers: {} },
    body,
    onSuccess,
    onFail
  );
};

const deleteProduct: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.delete(
    `/products/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};

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

export const getOrdererInfoList: ApiGetFunction<OrdererInfo[]> = (
  onSuccess,
  onFail
) => {
  return http.get(`/users`, { credentials: "include" }, onSuccess, onFail);
};

export const submitOrdererInfo: ApiModifyFunction<SucceedResponse> = (
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
  user: OrdererInfo,
  onSuccess: SuccessCallback<SucceedResponse>,
  onFail: FailCallback
) => {
  return putUser(transformUserForUpdate(user), onSuccess, onFail, user.userId);
};

export const reassignFolder = (
  dataList: OrdererInfo[] | Product[],
  folderId: string,
  onSuccess: SuccessCallback<SucceedResponse[] | Product[]>,
  onFail: FailCallback
) => {
  const promises: Promise<SucceedResponse | Product>[] = [];
  dataList.forEach((d: OrdererInfo | Product) => {
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
