import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { catchError, first, Observable, of, switchMap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { Actions, ofType } from '@ngrx/effects';
import { IServerResponse } from '../models/server-response.model';
import {
  LOAD_SERVERS,
  LOAD_SERVERS_RESPONSE,
} from '../stores/server/server.actions';
import { SELECT_SERVERS } from '../stores/server/server.selectors';

@Injectable({
  providedIn: 'root',
})
class GetServersService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<IServerResponse[]> {
    this._store.dispatch(LOAD_SERVERS());

    return this._actions$.pipe(
      ofType(LOAD_SERVERS_RESPONSE),
      first(),
      switchMap(() =>
        this._store.pipe(
          select(SELECT_SERVERS),
          first(),
          catchError(() => of([]))
        )
      ),
      catchError(() => of([]))
    );
  }
}

export const getServersResolver: ResolveFn<IServerResponse[]> = (
  route,
  state
) => {
  return inject(GetServersService).resolve(route, state);
};
