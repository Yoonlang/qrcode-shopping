import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const deleteUser: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.delete(
    `/users/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};
