import { SERVER_URL } from "@/components/const";
import { ProductType } from "@/components/ToBuyList/ToBuyItem/const";

type SuccessCallback<T> = (data: T) => void;
type FailCallback = (error: unknown) => void;

type getAPI<T> = (onSuccess: SuccessCallback<T>, onFail: FailCallback) => {};
type postAPI<T, U> = (
  body: U,
  onSuccess: SuccessCallback<T>,
  onFail: FailCallback
) => {};

const handleResponse = (res: Response) =>
  res.json().then((data) => {
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  });

const http = {
  get: (path: string, options = {}, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
      method: "GET",
      ...options,
    })
      .then(handleResponse)
      .then(onSuccess)
      .catch(onFail),
  post: (path: string, options = {}, body, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then(handleResponse)
      .then(onSuccess)
      .catch(onFail),
  put: (path: string, options = {}, body, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then(handleResponse)
      .then(onSuccess)
      .catch(onFail),
  delete: (path: string, options = {}, body, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then(handleResponse)
      .then(onSuccess)
      .catch(onFail),
};

export const getProductList: getAPI<ProductType[]> = (onSuccess, onFail) => {
  return http.get(`/products`, undefined, onSuccess, onFail);
};

export const postProduct: postAPI<undefined, FormData> = (
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

export const putProduct: postAPI<undefined, FormData> = (
  body,
  onSuccess,
  onFail
) => {
  return http.put(
    `/products`,
    { credentials: "include", headers: {} },
    body,
    onSuccess,
    onFail
  );
};

const deleteProduct: postAPI<unknown, string> = (body, onSuccess, onFail) => {
  return http.delete(
    `/products`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};

export const deleteProductList = (
  productList: ProductType[],
  onSuccess: SuccessCallback<unknown[]>,
  onFail: FailCallback
) => {
  const deletePromises = productList.map((product) => {
    return new Promise((resolve, reject) => {
      deleteProduct(JSON.stringify({ productId: product }), resolve, reject);
    });
  });

  Promise.all(deletePromises).then(onSuccess).catch(onFail);
};

export const getOrdererInfoList = (onSuccess, onFail) => {
  return http.get(`/users-info`, { credentials: "include" }, onSuccess, onFail);
};

export const submitOrdererInfo = (body, onSuccess, onFail) => {
  return http.post(`/users-info`, undefined, body, onSuccess, onFail);
};

const deleteOrderer = (body, onSuccess, onFail) => {
  return http.delete(
    `/users-info`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};

export const deleteOrdererList = (ordererList, onSuccess, onFail) => {
  const deletePromises = ordererList.map((orderer) => {
    return new Promise((resolve, reject) => {
      deleteOrderer(JSON.stringify({ userId: orderer }), resolve, reject);
    });
  });

  Promise.all(deletePromises).then(onSuccess).catch(onFail);
};

export const checkCookieAuth = (onSuccess, onFail) => {
  return http.get(`/cookie`, { credentials: "include" }, onSuccess, onFail);
};

export const postLogin = (body, onSuccess, onFail) => {
  return http.post(
    `/login`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};
