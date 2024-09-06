export interface IStartupVariable {
  name: string;
  value: string;
  defaultValue: string;
  dockerEnvironment: string;
  show: boolean;
  editable: boolean;
}
