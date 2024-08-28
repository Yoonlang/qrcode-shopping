import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const deleteProduct: ApiModifyFunction<SucceedResponse> = (
  body,
  targetId
) => {
  return http.delete(`/products/${targetId}`, { credentials: "include" }, body);
};
