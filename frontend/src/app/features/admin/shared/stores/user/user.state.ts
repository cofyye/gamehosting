import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { _httpResponse } from '../../../../../shared/models/response.model';
import { IUserResponse } from '../../models/user-response.model';

export interface UserState extends EntityState<IUserResponse> {
  selectedUserId: string | null;
}

export const userAdapter: EntityAdapter<IUserResponse> =
  createEntityAdapter<IUserResponse>();

export const initialState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
});
