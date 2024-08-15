import { ApiGetFunction } from "@/api/const";
import http from "@/api/http";
import { Folder } from "@/const";

export const getFolderList: ApiGetFunction<Folder[]> = () => {
  return http.get(`/folders`, { credentials: "include" });
};
