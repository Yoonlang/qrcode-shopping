import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const putText: ApiModifyFunction<SucceedResponse> = (body) => {
  return http.put(`/text`, { credentials: "include" }, body);
};
