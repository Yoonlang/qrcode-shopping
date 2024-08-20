import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const postProduct: ApiModifyFunction<SucceedResponse> = (body) => {
  return http.post(`/products`, { credentials: "include", headers: {} }, body);
};
