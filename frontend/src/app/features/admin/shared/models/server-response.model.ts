import { IStartupVariable } from '../../../../shared/models/mod.model';
import { IGameResponse } from './game-response.model';

export interface IServerResponse {
  id: string;
  gameId: string;
  modName: string;
  dockerImage: string;
  startupVariables: IStartupVariable;
  startupCommand: string;
  description: string;
  active: boolean;
  createdAt: Date;
  game?: IGameResponse;
}
