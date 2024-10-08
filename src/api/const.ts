export const API_VERSION = "/v1";

export interface SucceedResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export type SuccessCallback<T> = (data: T) => void;
export type FailCallback = (error: Error) => void;

export type ApiGetFunction<T> = (targetId?: string) => Promise<T>;

export type ApiModifyFunction<T> = (
  body: BodyInit | null | undefined,
  targetId?: string
) => Promise<T>;
