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
import { IMachineResponse } from '../models/machine-response.model';
import {
  LOAD_MACHINES,
  LOAD_MACHINES_RESPONSE,
} from '../../features/machine/store/machine.actions';
import { SELECT_MACHINES } from '../../features/machine/store/machine.selectors';

@Injectable({
  providedIn: 'root',
})
class GetMachinesService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<IMachineResponse[]> {
    this._store.dispatch(LOAD_MACHINES());

    return this._actions$.pipe(
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
    );
  }
}

export const getMachinesResolver: ResolveFn<IMachineResponse[]> = (
  route,
  state
) => {
  return inject(GetMachinesService).resolve(route, state);
};
