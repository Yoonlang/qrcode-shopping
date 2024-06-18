import { SERVER_URL } from "@/components/const";

export const getProductList = (onSuccess, onFail) => {
  return fetch(`${SERVER_URL}/products`, {
    method: "get",
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
    .catch(onFail);
};

export const submitOrdererInfo = (body, onSuccess, onFail) => {
  return fetch(`${SERVER_URL}/users-info`, {
    method: "POST",
    headers: {
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
    .catch(onFail);
};
