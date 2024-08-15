import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const postProductList: ApiModifyFunction<SucceedResponse> = (body) => {
  return http.post(`/products/batch`, { credentials: "include" }, body);
};
