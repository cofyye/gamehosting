export interface IAcceptResponse {
  success: boolean;
  message: string;
}

export interface IDataAcceptResponse<T> extends IAcceptResponse {
  data: T;
}

export interface _httpResponse {
  [key: string]: {
    response: IAcceptResponse;
  };
}
