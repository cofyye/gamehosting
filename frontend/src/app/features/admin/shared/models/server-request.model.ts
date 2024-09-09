export interface IServerAddRequest {
  gameId: string;
  modName: string;
  dockerImage: string;
  description: string;
  dockerFile: File;
  startupCommand: string;
  startupVariables: string;
}
