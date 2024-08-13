import { ApiGetFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const getCookie: ApiGetFunction<SucceedResponse> = (
  onSuccess,
  onFail
) => {
  return http.get(`/cookie`, { credentials: "include" }, onSuccess, onFail);
};
