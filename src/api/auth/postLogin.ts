import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const postLogin: ApiModifyFunction<SucceedResponse> = (body) => {
  return http.post(`/login`, { credentials: "include" }, body);
};
