import {
  API_VERSION,
  ErrorResponse,
  FailCallback,
  SuccessCallback,
} from "@/api/const";
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
  get: <T>(
    path: string,
    options = {},
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "GET",
      ...options,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  post: <T>(
    path: string,
    options = {},
    body: BodyInit | null | undefined,
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  put: <T>(
    path: string,
    options = {},
    body: BodyInit | null | undefined,
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  patch: <T>(
    path: string,
    options = {},
    body: BodyInit | null | undefined,
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
  delete: <T>(
    path: string,
    options = {},
    body: BodyInit | null | undefined,
    onSuccess: SuccessCallback<T>,
    onFail: FailCallback
  ) =>
    fetch(`${SERVER_URL}${API_VERSION}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body,
    })
      .then((res) => handleResponse<T>(res))
      .then(onSuccess)
      .catch(onFail),
};

export default http;
