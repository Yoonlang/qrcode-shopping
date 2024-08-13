import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const deleteFolder: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.delete(
    `/folders/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};
