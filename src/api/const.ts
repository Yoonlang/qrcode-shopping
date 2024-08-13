export const API_VERSION = "/v1";

export interface SucceedResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export type SuccessCallback<T> = (data: T) => void;
export type FailCallback = (error: Error) => void;

export type ApiGetFunction<T> = (
  onSuccess: SuccessCallback<T>,
  onFail: FailCallback,
  targetId?: string
) => Promise<void>;

export type ApiModifyFunction<T> = (
  body: BodyInit | null | undefined,
  onSuccess: SuccessCallback<T>,
  onFail: FailCallback,
  targetId?: string
) => Promise<void>;
