export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  country: string;
  countryTag: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ITokenRequest {
  email: string;
  token: string;
}
