import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import {
  catchError,
  filter,
  first,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { ILocation } from '../../../../../shared/models/location/location.model';
import { LOCATIONS_LOAD } from '../../../../../shared/stores/location/location.actions';
import {
  SELECT_LOCATION_LOADED,
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
  ): Observable<ILocation[]> {
    this._store.dispatch(LOCATIONS_LOAD());

    return this._store.pipe(
      select(SELECT_LOCATION_LOADED),
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

export const getLocationsResolver: ResolveFn<ILocation[]> = (route, state) => {
  return inject(GetLocationsService).resolve(route, state);
};
