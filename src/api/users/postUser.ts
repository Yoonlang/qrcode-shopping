import { ApiModifyFunction } from "@/api/const";
import http from "@/api/http";
import { User } from "@/const";

export const postUser: ApiModifyFunction<User> = (body, onSuccess, onFail) => {
  return http.post(`/users`, undefined, body, onSuccess, onFail);
};
