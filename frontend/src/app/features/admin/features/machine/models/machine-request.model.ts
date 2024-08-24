export interface IMachineAddRequest {
  locationId: string;
  name: string;
  ip: string;
  username: string;
  password: string;
  sshPort: number;
  ftpPort: number;
  games: string[];
}
