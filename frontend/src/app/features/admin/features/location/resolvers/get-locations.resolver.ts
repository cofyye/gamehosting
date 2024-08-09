import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { catchError, filter, first, Observable, of, switchMap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { ILocationResponse } from '../../../../../shared/models/location/location-response.model';
import { LOAD_LOCATIONS } from '../../../../../shared/stores/location/location.actions';
import {
  IS_LOCATION_HTTP_LOADED,
  SELECT_LOCATIONS,
} from '../../../../../shared/stores/location/location.selectors';

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

    return this._store.pipe(
      select(IS_LOCATION_HTTP_LOADED('LOAD_LOCATIONS')),
      filter((loaded) => loaded),
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
