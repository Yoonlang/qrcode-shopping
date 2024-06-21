import { SERVER_URL } from "@/components/const";

const handleResponse = (res) =>
  res.json().then((data) => {
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  });

const http = {
  get: (path, options = {}, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
      method: "GET",
      ...options,
    })
      .then(handleResponse)
      .then(onSuccess)
      .catch(onFail),
  post: (path, options = {}, body, onSuccess, onFail) =>
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
  put: (path, options = {}, body, onSuccess, onFail) =>
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
  delete: (path, options = {}, body, onSuccess, onFail) =>
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

export const getProductList = (onSuccess, onFail) => {
  return http.get(`/products`, undefined, onSuccess, onFail);
};

export const postProduct = (body, onSuccess, onFail) => {
  return http.post(
    `/products`,
    { credentials: "include", headers: {} },
    body,
    onSuccess,
    onFail
  );
};

export const putProduct = (body, onSuccess, onFail) => {
  return http.put(
    `/products`,
    { credentials: "include", headers: {} },
    body,
    onSuccess,
    onFail
  );
};

const deleteProduct = (body, onSuccess, onFail) => {
  return http.delete(
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
