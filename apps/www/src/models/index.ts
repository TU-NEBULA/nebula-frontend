export interface BaseResponseDTO<T> {
  isSuccess: boolean;
  message: string;
  code: string;
  result: T;
}

export interface PaginationResponseDTO<T> {
  content: T[];
  maxPage: number;
  hasNext: boolean;
}
