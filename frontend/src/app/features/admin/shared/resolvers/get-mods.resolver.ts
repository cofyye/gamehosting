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
import { LOAD_MODS, LOAD_MODS_RESPONSE } from '../stores/mod/mod.actions';
import { IModResponse } from '../models/mod-response.model';
import { SELECT_MODS } from '../stores/mod/mod.selectors';

@Injectable({
  providedIn: 'root',
})
class GetModsService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<IModResponse[]> {
    this._store.dispatch(LOAD_MODS());

    return this._actions$.pipe(
      ofType(LOAD_MODS_RESPONSE),
      first(),
      switchMap(() =>
        this._store.pipe(
          select(SELECT_MODS),
          first(),
          catchError(() => of([]))
        )
      ),
      catchError(() => of([]))
    );
  }
}

export const getModsResolver: ResolveFn<IModResponse[]> = (route, state) => {
  return inject(GetModsService).resolve(route, state);
};
