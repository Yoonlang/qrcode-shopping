import { SERVER_URL } from "@/components/const";
import { Folder, OrdererInfo, Product } from "@/const";

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

export const putProduct: ApiModifyFunction<SucceedResponse> = (
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

export const deleteProductList = (
  productList: string[],
  onSuccess: SuccessCallback<SucceedResponse[]>,
  onFail: FailCallback
) => {
  const deletePromises = productList.map((productId) => {
    return new Promise((resolve, reject) => {
      deleteProduct(undefined, resolve, reject, productId);
    });
  });

  Promise.all(deletePromises).then(onSuccess).catch(onFail);
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

export const deleteOrdererList = (
  ordererList: string[],
  onSuccess: SuccessCallback<SucceedResponse[]>,
  onFail: FailCallback
) => {
  const deletePromises = ordererList.map((ordererId) => {
    return new Promise((resolve, reject) => {
      deleteOrderer(undefined, resolve, reject, ordererId);
    });
  });

  Promise.all(deletePromises).then(onSuccess).catch(onFail);
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
  onFail
) => {
  return http.patch(
    `/folders`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
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
