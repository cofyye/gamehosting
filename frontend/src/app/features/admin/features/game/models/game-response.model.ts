export interface IGameResponse {
  id: string;
  name: string;
  tag: string;
  startPort: number;
  endPort: number;
  slotMin: number;
  slotMax: number;
  hostBy: string;
  description: string;
  active: boolean;
  createdAt: Date;
}
