import { API_VERSION, ErrorResponse } from "@/api/const";
import { SERVER_URL } from "@/components/const";

const isErrorResponse = (data: unknown): data is ErrorResponse => {
  return typeof data === "object" && data !== null && "error" in data;
};

const handleResponse = <T>(res: Response): Promise<T> =>
  res.json().then((data: T | ErrorResponse) => {
    if (!res.ok && isErrorResponse(data)) {
      throw new Error(data.error);
    }
    return data as T;
  });

const http = {
  get: <T>(path: string, options = {}) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "GET",
      ...options,
    }).then((res) => handleResponse<T>(res)),
  post: <T>(path: string, options = {}, body: BodyInit | null | undefined) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    }).then((res) => handleResponse<T>(res)),
  put: <T>(path: string, options = {}, body: BodyInit | null | undefined) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    }).then((res) => handleResponse<T>(res)),
  patch: <T>(path: string, options = {}, body: BodyInit | null | undefined) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    }).then((res) => handleResponse<T>(res)),
  delete: <T>(path: string, options = {}, body: BodyInit | null | undefined) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    }).then((res) => handleResponse<T>(res)),
};

export default http;
