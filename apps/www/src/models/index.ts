export interface BaseResponseDTO<T> {
  isSuccess: boolean;
  message: string;
  code: string;
  result: T;
}
