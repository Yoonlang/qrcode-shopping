import { ApiModifyFunction } from "@/api/const";
import http from "@/api/http";
import { Product } from "@/const";

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
