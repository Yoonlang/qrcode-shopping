import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const deleteFolder: ApiModifyFunction<SucceedResponse> = (
  body,
  targetId
) => {
  return http.delete(`/folders/${targetId}`, { credentials: "include" }, body);
};
