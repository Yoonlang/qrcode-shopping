import { SERVER_URL } from "@/components/const";

const http = {
  get: (path, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
      method: "GET",
    })
      .then((res) =>
        res.json().then((data) => {
          if (!res.ok) {
            throw new Error(data.error);
          }
          return data;
        })
      )
      .then(onSuccess)
      .catch(onFail),
  post: (path, headers, body, onSuccess, onFail) =>
    fetch(`${SERVER_URL}${path}`, {
      method: "POST",
      headers: headers ?? {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) =>
        res.json().then((data) => {
          if (!res.ok) {
            throw new Error(data.error);
          }
          return data;
        })
      )
      .then(onSuccess)
      .catch(onFail),
};

export const getProductList = (onSuccess, onFail) => {
  return http.get(`/products`, onSuccess, onFail);
};

export const submitOrdererInfo = (body, onSuccess, onFail) => {
  return http.post(`/users-info`, null, body, onSuccess, onFail);
};
