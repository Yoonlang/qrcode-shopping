import { ApiGetFunction } from "@/api/const";
import http from "@/api/http";
import { Folder } from "@/const";

export const getFolderList: ApiGetFunction<Folder[]> = (onSuccess, onFail) => {
  return http.get(`/folders`, { credentials: "include" }, onSuccess, onFail);
};
