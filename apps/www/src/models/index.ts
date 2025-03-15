export interface BaseResponseDTO<T> {
  isSusccess: boolean;
  message: string;
  code: string;
  result: T;
}
