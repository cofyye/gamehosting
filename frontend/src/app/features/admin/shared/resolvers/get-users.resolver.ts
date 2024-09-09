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
import { IUserResponse } from '../models/user-response.model';
import { LOAD_USERS, LOAD_USERS_RESPONSE } from '../stores/user/user.actions';
import { SELECT_USERS } from '../stores/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
class GetUsersService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<IUserResponse[]> {
    this._store.dispatch(LOAD_USERS());

    return this._actions$.pipe(
      ofType(LOAD_USERS_RESPONSE),
      first(),
      switchMap(() =>
        this._store.pipe(
          select(SELECT_USERS),
          first(),
          catchError(() => of([]))
        )
      ),
      catchError(() => of([]))
    );
  }
}

export const getUsersResolver: ResolveFn<IUserResponse[]> = (route, state) => {
  return inject(GetUsersService).resolve(route, state);
};
