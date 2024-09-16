export interface ILocationAddRequest {
  country: string;
  countryTag: string;
  city: string;
}

export interface ILocationEditRequest {
  id: string;
  country: string;
  countryTag: string;
  city: string;
}
