export interface IServerAddRequest {
  gameId: string;
  modId: string;
  machineId: string;
  planId: string;
  userId: string;
  name: string;
  port: string;
  customPrice?: number;
  expirationDate: Date;
}
