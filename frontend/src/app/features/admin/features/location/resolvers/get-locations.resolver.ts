import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { catchError, filter, first, Observable, of, switchMap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { ILocationResponse } from '../models/location-response.model';
import { LOAD_LOCATIONS } from '../store/location.actions';
import { SELECT_LOCATIONS } from '../store/location.selectors';
import { IS_HTTP_LOADED } from '../../../../../shared/stores/http/http.selectors';
import { SET_LOAD } from '../../../../../shared/stores/http/http.actions';

@Injectable({
  providedIn: 'root',
})
class GetLocationsService {
  constructor(private readonly _store: Store<AppState>) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<ILocationResponse[]> {
    this._store.dispatch(LOAD_LOCATIONS());
    this._store.dispatch(SET_LOAD({ key: 'LOAD_LOCATIONS', load: true }));

    return this._store.pipe(
      select(IS_HTTP_LOADED('LOAD_LOCATIONS')),
      filter((load) => load),
      first(),
      switchMap(() =>
        this._store.pipe(
          select(SELECT_LOCATIONS),
          first(),
          catchError(() => of([]))
        )
      )
    );
  }
}

export const getLocationsResolver: ResolveFn<ILocationResponse[]> = (
  route,
  state
) => {
  return inject(GetLocationsService).resolve(route, state);
};
