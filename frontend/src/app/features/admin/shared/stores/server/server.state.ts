import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { _httpResponse } from '../../../../../shared/models/response.model';
import { IServerResponse } from '../../models/server-response.model';

export interface ServerState extends EntityState<IServerResponse> {
  selectedServerId: string | null;
}

export const serverAdapter: EntityAdapter<IServerResponse> =
  createEntityAdapter<IServerResponse>();

export const initialState: ServerState = serverAdapter.getInitialState({
  selectedServerId: null,
});
