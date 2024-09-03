import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { _httpResponse } from '../../../../../shared/models/response.model';
import { IModResponse } from '../../models/mod-response.model';

export interface ModState extends EntityState<IModResponse> {
  selectedModId: string | null;
}

export const modAdapter: EntityAdapter<IModResponse> =
  createEntityAdapter<IModResponse>();

export const initialState: ModState = modAdapter.getInitialState({
  selectedModId: null,
});
