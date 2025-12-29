export interface NekoAPIResponse<T> {
  status: string;
  data: T;
  message: string;
}
