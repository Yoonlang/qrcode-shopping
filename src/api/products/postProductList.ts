import { ApiModifyFunction, SucceedResponse } from "@/api/const";
import http from "@/api/http";

export const postProductList: ApiModifyFunction<SucceedResponse> = (
  body,
  onSuccess,
  onFail
) => {
  return http.post(
    `/products/batch`,
    { credentials: "include" },
    body,
    onSuccess,
    onFail
  );
};
