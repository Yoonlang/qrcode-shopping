import { ApiGetFunction } from "@/api/const";
import http from "@/api/http";
import { User } from "@/const";

export const getUserList: ApiGetFunction<User[]> = () => {
  return http.get(`/users`, { credentials: "include" });
};
