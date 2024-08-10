import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { catchError, filter, first, Observable, of, switchMap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { IS_HTTP_LOADED } from '../../../../../shared/stores/http/http.selectors';
import { SET_LOAD } from '../../../../../shared/stores/http/http.actions';
import { IGameResponse } from '../models/game-response.model';
import { LOAD_GAMES } from '../store/game.actions';
import { SELECT_GAMES } from '../store/game.selectors';

@Injectable({
  providedIn: 'root',
})
class GetGamesService {
  constructor(private readonly _store: Store<AppState>) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<IGameResponse[]> {
    this._store.dispatch(LOAD_GAMES());
    this._store.dispatch(SET_LOAD({ key: 'LOAD_GAMES', load: true }));

    return this._store.pipe(
      select(IS_HTTP_LOADED('LOAD_GAMES')),
      filter((load) => load),
      first(),
      switchMap(() =>
        this._store.pipe(
          select(SELECT_GAMES),
          first(),
          catchError(() => of([]))
        )
      )
    );
  }
}

export const getGamesResolver: ResolveFn<IGameResponse[]> = (route, state) => {
  return inject(GetGamesService).resolve(route, state);
};
