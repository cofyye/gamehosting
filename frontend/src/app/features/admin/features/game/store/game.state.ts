import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IGameResponse } from '../models/game-response.model';
import { _httpResponse } from '../../../../../shared/models/response.model';

export interface GameState extends EntityState<IGameResponse> {
  selectedGameId: string | null;
}

export const gameAdapter: EntityAdapter<IGameResponse> =
  createEntityAdapter<IGameResponse>();

export const initialState: GameState = gameAdapter.getInitialState({
  selectedGameId: null,
});
