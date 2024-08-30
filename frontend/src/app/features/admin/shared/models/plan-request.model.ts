export interface IPlanAddRequest {
  gameId: string;
  name: string;
  slot?: number;
  ram?: number;
  cpuCount?: number;
  price: number;
  description: string;
  machines: string;
}
