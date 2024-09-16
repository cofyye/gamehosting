import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
  Router,
} from '@angular/router';
import { catchError, first, map, Observable, of, switchMap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { ILocationResponse } from '../models/location-response.model';
import { Actions, ofType } from '@ngrx/effects';
import {
  LOAD_LOCATION,
  LOAD_LOCATION_RESPONSE,
} from '../stores/location/location.actions';
import { SELECT_LOCATION_BY_ID } from '../stores/location/location.selectors';

@Injectable({
  providedIn: 'root',
})
class GetLocationService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): Observable<ILocationResponse | null> {
    const locationId = route.paramMap.get('locationId') ?? '';

    this._store.dispatch(LOAD_LOCATION({ id: locationId }));

    return this._actions$.pipe(
      ofType(LOAD_LOCATION_RESPONSE),
      first(),
      switchMap(() =>
        this._store.pipe(
          select(SELECT_LOCATION_BY_ID(locationId)),
          first(),
          map((location) => {
            if (!location) {
              this._router.navigate(['/admin/locations']);
            }

            return location;
          }),
          catchError(() => {
            this._router.navigate(['/admin/locations']);

            return of(null);
          })
        )
      ),
      catchError(() => {
        this._router.navigate(['/admin/locations']);

        return of(null);
      })
    );
  }
}

export const getLocationResolver: ResolveFn<ILocationResponse | null> = (
  route,
  state
) => {
  return inject(GetLocationService).resolve(route, state);
};
