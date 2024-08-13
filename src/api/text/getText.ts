import { ApiGetFunction } from "@/api/const";
import http from "@/api/http";

export const getText: ApiGetFunction<{ text: string }> = (
  onSuccess,
  onFail
) => {
  return http.get(`/text`, undefined, onSuccess, onFail);
};
