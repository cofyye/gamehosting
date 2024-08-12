import { HostBy } from '../../../../../shared/enums/game.enum';

export interface IGameAddRequest {
  name: string;
  tag: string;
  startPort: number;
  endPort: number;
  hostBy: HostBy;
  description: string;
}
