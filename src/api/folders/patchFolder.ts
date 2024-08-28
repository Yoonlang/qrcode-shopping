import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const patchFolder: ApiModifyFunction<SucceedResponse> = (
  body,
  targetId
) => {
  return http.patch(`/folders/${targetId}`, { credentials: "include" }, body);
};
