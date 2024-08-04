import { ILoader } from '../../models/loader.model';

export interface LoaderState {
  loader: ILoader;
}

export const initialState: LoaderState = {
  loader: {},
};
