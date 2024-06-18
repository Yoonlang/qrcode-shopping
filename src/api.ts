import { SERVER_URL } from "@/components/const";

export const getProductList = (success, fail) => {
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
    .then(success)
    .catch(fail);
};
