import { IGameResponse } from './game-response.model';

export interface IPlanResponse {
  id: string;
  gameId: string;
  name: string;
  slot?: number;
  ram?: number;
  cpuCount?: number;
  price: number;
  description: string;
  active: boolean;
  createdAt: Date;
  game?: IGameResponse;
}
