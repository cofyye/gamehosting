export interface ICustomStartupVariable {
  name: string;
  docker_env?: string;
  value?: string;
  show: boolean;
  editable: boolean;
  default_value: string;
}

export interface IRequiredStartupVariable {
  IP: string;
  PORT: string;
  SLOT: string;
  RAM: string;
  FTP_USER: string;
  CPU_COUNT: string;
}
