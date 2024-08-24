import { createFeatureSelector, createSelector } from '@ngrx/store';
import { gameAdapter, GameState } from './game.state';

const { selectAll, selectEntities } = gameAdapter.getSelectors();

export const SELECT_GAME_STATE = createFeatureSelector<GameState>('game');

export const SELECT_GAMES = createSelector(SELECT_GAME_STATE, selectAll);

export const SELECT_GAMES_ENTITIES = createSelector(
  SELECT_GAME_STATE,
  selectEntities
);

export const SELECT_SELECTED_GAME_ID = createSelector(
  SELECT_GAME_STATE,
  (state: GameState) => state.selectedGameId
);

export const SELECT_SELECTED_GAME = createSelector(
  SELECT_GAMES_ENTITIES,
  SELECT_SELECTED_GAME_ID,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
