import { SERVER_URL } from "@/components/const";
import { ProductType } from "@/const";

interface SucceedResponse {
  message: string;
}

interface ErrorResponse {
  error: string;
}

const isErrorResponse = (data: any): data is ErrorResponse => {
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
  get: <T = unknown>(path: string, options = {}, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
      method: "GET",
      ...options,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  post: <T = unknown>(path: string, options = {}, body, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
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
  put: <T = unknown>(path: string, options = {}, body, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
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
  delete: <T = unknown>(path: string, options = {}, body, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
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

export const getProductList = (onSuccess, onFail) => {
  return http.get<ProductType[]>(`/products`, undefined, onSuccess, onFail);
};

export const postProduct = (body, onSuccess, onFail) => {
  return http.post<SucceedResponse>(
    `/products`,
    { credentials: "include", headers: {} },
    body,
    onSuccess,
    onFail
  );
};

export const putProduct = (body, onSuccess, onFail) => {
  return http.put<SucceedResponse>(
    `/products`,
    { credentials: "include", headers: {} },
    body,
    onSuccess,
    onFail
  );
};

const deleteProduct = (body, onSuccess, onFail) => {
  return http.delete<SucceedResponse>(
    `/products`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};

export const deleteProductList = (productList, onSuccess, onFail) => {
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
