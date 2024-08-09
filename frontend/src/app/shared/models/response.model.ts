export interface IAcceptResponse {
  success: boolean;
  message: string;
}

export interface IDataAcceptResponse<T> extends IAcceptResponse {
  data: T;
}

export interface IResponse {
  [key: string]: IAcceptResponse;
}
