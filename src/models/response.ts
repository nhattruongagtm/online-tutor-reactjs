export interface ResponseData<T> {
  message: string;
  status: string;
  data: T;
}