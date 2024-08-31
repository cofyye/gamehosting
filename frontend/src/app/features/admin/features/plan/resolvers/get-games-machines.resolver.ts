import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import {
  catchError,
  combineLatest,
  first,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { AppState } from '../../../../../app.state';
import { IGameResponse } from '../../../shared/models/game-response.model';
import {
  LOAD_GAMES,
  LOAD_GAMES_RESPONSE,
} from '../../../shared/stores/game/game.actions';
import { SELECT_GAMES } from '../../../shared/stores/game/game.selectors';
import { IMachineResponse } from '../../../shared/models/machine-response.model';
import {
  LOAD_MACHINES,
  LOAD_MACHINES_RESPONSE,
} from '../../../shared/stores/machine/machine.actions';
import { SELECT_MACHINES } from '../../../shared/stores/machine/machine.selectors';

@Injectable({
  providedIn: 'root',
})
class GetGamesMachinesService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<{ games: IGameResponse[]; machines: IMachineResponse[] }> {
    this._store.dispatch(LOAD_GAMES());
    this._store.dispatch(LOAD_MACHINES());

    return combineLatest([
      this._actions$.pipe(
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
      this._actions$.pipe(
        ofType(LOAD_MACHINES_RESPONSE),
        first(),
        switchMap(() =>
          this._store.pipe(
            select(SELECT_MACHINES),
            first(),
            catchError(() => of([]))
          )
        ),
        catchError(() => of([]))
      ),
    ]).pipe(map(([games, machines]) => ({ games, machines })));
  }
}

export const getGamesMachinesResolver: ResolveFn<{
  games: IGameResponse[];
  machines: IMachineResponse[];
}> = (route, state) => {
  return inject(GetGamesMachinesService).resolve(route, state);
};
