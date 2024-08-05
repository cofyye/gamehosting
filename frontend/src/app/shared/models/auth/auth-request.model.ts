export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  pinCode: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
