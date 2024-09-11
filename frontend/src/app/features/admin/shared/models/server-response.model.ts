import { ServerStatus } from '../../../../shared/enums/server.enum';
import { IStartupVariable } from '../../../../shared/models/mod.model';
import { IGameResponse } from './game-response.model';
import { IMachineResponse } from './machine-response.model';
import { IModResponse } from './mod-response.model';
import { IPlanResponse } from './plan-response.model';
import { IUserResponse } from './user-response.model';

export interface IServerResponse {
  id: string;
  userId: string;
  machineId: string;
  gameId: string;
  modId: string;
  planId: string;
  name: string;
  ftpUsername: string;
  ftpPassword: string;
  startupVariables: IStartupVariable[];
  port: number;
  customPrice: number | null;
  started: boolean;
  status: ServerStatus;
  expirationDate: Date;
  createdAt: Date;
  user?: IUserResponse;
  mod?: IModResponse;
  plan?: IPlanResponse;
  game?: IGameResponse;
  machine?: IMachineResponse;
}
