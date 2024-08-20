import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const postFolder: ApiModifyFunction<SucceedResponse> = (body) => {
  return http.post(`/folders`, { credentials: "include" }, body);
};
