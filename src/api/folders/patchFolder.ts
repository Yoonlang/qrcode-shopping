import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const patchFolder: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail,
  targetId
) => {
  return http.patch(
    `/folders/${targetId}`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};
