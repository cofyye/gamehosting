import { HostBy } from '../../../../shared/enums/game.enum';

export interface IGameResponse {
  id: string;
  name: string;
  tag: string;
  startPort: number;
  endPort: number;
  slotMin: number;
  slotMax: number;
  hostBy: HostBy;
  description: string;
  active: boolean;
  createdAt: Date;
}
