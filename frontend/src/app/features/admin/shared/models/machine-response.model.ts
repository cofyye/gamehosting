export interface IMachineResponse {
  id: string;
  locationId: string;
  name: string;
  ip: string;
  username: string;
  sshPort: number;
  ftpPort: number;
  createdAt: Date;
}
