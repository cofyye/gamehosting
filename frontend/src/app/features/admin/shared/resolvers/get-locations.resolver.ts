import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { catchError, first, Observable, of, switchMap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { ILocationResponse } from '../models/location-response.model';
import {
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_RESPONSE,
} from '../../features/location/store/location.actions';
import { SELECT_LOCATIONS } from '../../features/location/store/location.selectors';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
class GetLocationsService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<ILocationResponse[]> {
    this._store.dispatch(LOAD_LOCATIONS());

    return this._actions$.pipe(
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
    );
  }
}

export const getLocationsResolver: ResolveFn<ILocationResponse[]> = (
  route,
  state
) => {
  return inject(GetLocationsService).resolve(route, state);
};
