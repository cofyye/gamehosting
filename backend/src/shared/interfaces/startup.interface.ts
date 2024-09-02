export interface ICustomStartupVariable {
  name: string;
  dockerEnvironment?: string;
  value?: string;
  show: boolean;
  editable: boolean;
  defaultValue: string;
}

export interface IRequiredStartupVariable {
  IP: string;
  PORT: string;
  SLOT: string;
  RAM: string;
  FTP_USER: string;
  CPU_COUNT: string;
}
