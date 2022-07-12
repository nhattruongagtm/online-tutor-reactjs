export interface ResponseData<T> {
  message: string;
  status: string;
  data: T;
}
export interface CheckoutResp {

  customerName: string;
  className: string;
  content: string;
  amount: number;
  createdDate: string;
}
export interface CheckoutReq {
  accountId: number;
  classId: number;
  formal: boolean;
  amount: number;
  node: string;

}
export interface CheckoutSuccess {
  paymentId: string;
  PayerID: string;
}
