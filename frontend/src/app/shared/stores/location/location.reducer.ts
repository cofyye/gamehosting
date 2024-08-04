import { createReducer, on } from '@ngrx/store';
import { initialState } from './location.state';

export const locationReducer = createReducer(initialState);
