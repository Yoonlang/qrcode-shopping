import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const putUser: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.put(
    `/users/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};
