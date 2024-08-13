import { ApiGetFunction } from "@/api/const";
import http from "@/api/http";
import { Product } from "@/const";

export const getProductList: ApiGetFunction<Product[]> = (
  onSuccess,
  onFail
) => {
  return http.get(`/products`, undefined, onSuccess, onFail);
};
