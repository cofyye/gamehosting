import { Loader } from '../../models/loader.model';

export interface LoaderState {
  loader: Loader;
}

export const initialState: LoaderState = {
  loader: {},
};
