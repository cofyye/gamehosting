export interface IMachinePlan {
  machineId: string;
  machineName: string;
  maxServers: number;
}

export interface IMachinePlanRequest {
  id: string;
  maxServers: number;
}
