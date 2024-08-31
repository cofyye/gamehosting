export interface IMachinePlan {
  machineId: string;
  machineName: string;
  maxServers: number;
}

export interface IMachinePlanRequest {
  id: string;
  server_count: number;
}
