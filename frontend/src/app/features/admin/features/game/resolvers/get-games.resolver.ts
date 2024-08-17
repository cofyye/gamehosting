import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { catchError, first, Observable, of, switchMap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { IGameResponse } from '../models/game-response.model';
import { LOAD_GAMES, LOAD_GAMES_RESPONSE } from '../store/game.actions';
import { SELECT_GAMES } from '../store/game.selectors';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
class GetGamesService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<IGameResponse[]> {
    this._store.dispatch(LOAD_GAMES());

    return this._actions$.pipe(
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
    );
  }
}

export const getGamesResolver: ResolveFn<IGameResponse[]> = (route, state) => {
  return inject(GetGamesService).resolve(route, state);
};
