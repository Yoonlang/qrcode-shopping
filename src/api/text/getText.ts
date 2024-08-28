import { ApiGetFunction } from "@/api/const";
import http from "@/api/http";

export const getText: ApiGetFunction<{ text: string }> = () => {
  return http.get(`/text`, undefined);
};
