import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const putText: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail
) => {
  return http.put(`/text`, { credentials: "include" }, body, onSuccess, onFail);
};
