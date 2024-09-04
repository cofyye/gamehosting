export interface IModAddRequest {
  gameId: string;
  modName: string;
  dockerImage: string;
  description: string;
  dockerFile: File;
  startupCommand: string;
  startupVariables: string;
}
