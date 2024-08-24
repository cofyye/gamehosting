import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import {
  catchError,
  first,
  forkJoin,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { ILocationResponse } from '../../../shared/models/location-response.model';
import { AppState } from '../../../../../app.state';
import { IGameResponse } from '../../../shared/models/game-response.model';
import {
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_RESPONSE,
} from '../../../shared/stores/location/location.actions';
import {
  LOAD_GAMES,
  LOAD_GAMES_RESPONSE,
} from '../../../shared/stores/game/game.actions';
import { SELECT_LOCATIONS } from '../../../shared/stores/location/location.selectors';
import { SELECT_GAMES } from '../../../shared/stores/game/game.selectors';

@Injectable({
  providedIn: 'root',
})
class GetLocationsGamesService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<{ locations: ILocationResponse[]; games: IGameResponse[] }> {
    this._store.dispatch(LOAD_GAMES());
    this._store.dispatch(LOAD_LOCATIONS());

    return forkJoin({
      games: this._actions$.pipe(
        ofType(LOAD_GAMES_RESPONSE),
        first(),
        switchMap(() =>
          this._store.pipe(
            select(SELECT_GAMES),
            first(),
            catchError(() => of([]))
          )
        ),
        catchError(() => of([]))
      ),
      locations: this._actions$.pipe(
        ofType(LOAD_LOCATIONS_RESPONSE),
        first(),
        switchMap(() =>
          this._store.pipe(
            select(SELECT_LOCATIONS),
            first(),
            catchError(() => of([]))
          )
        ),
        catchError(() => of([]))
      ),
    });
  }
}

export const getLocationsGamesResolver: ResolveFn<{
  locations: ILocationResponse[];
  games: IGameResponse[];
}> = (route, state) => {
  return inject(GetLocationsGamesService).resolve(route, state);
};
