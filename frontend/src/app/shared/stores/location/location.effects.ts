import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as LocationActions from './location.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { UtilsService } from '../../services/utils.service';
import { STOP_LOADING } from '../loader/loader.actions';
import { LocationService } from '../../services/location.service';

@Injectable()
export class LocationEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _locationService: LocationService,
    private readonly _utilsService: UtilsService,
    private readonly _store: Store<AppState>
  ) {}

  addLocation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LocationActions.ADD_LOCATION),
      mergeMap((action) =>
        this._locationService.addLocation(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'ADD_LOCATION_BTN' }));

            return response;
          }),
          map((response) =>
            LocationActions.ADD_LOCATION_RESPONSE({
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._utilsService.handleErrorToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'ADD_LOCATION_BTN' }));

            return of(
              LocationActions.ADD_LOCATION_RESPONSE({
                response,
              })
            );
          })
        )
      )
    )
  );

  deleteLocation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LocationActions.DELETE_LOCATION),
      mergeMap((action) =>
        this._locationService.deleteLocation(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_LOCATION_BTN' }));

            return response;
          }),
          map((response) =>
            LocationActions.DELETE_LOCATION_RESPONSE({
              response,
              data: action.payload,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._utilsService.handleErrorToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_LOCATION_BTN' }));

            return of(
              LocationActions.DELETE_LOCATION_RESPONSE({
                response,
                data: '',
              })
            );
          })
        )
      )
    )
  );

  loadLocations$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LocationActions.LOAD_LOCATIONS),
      mergeMap(() =>
        this._locationService.getLocations().pipe(
          map((response) =>
            LocationActions.LOAD_LOCATIONS_RESPONSE({
              response,
              data: response.data,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._utilsService.handleErrorToaster(response);

            return of(
              LocationActions.LOAD_LOCATIONS_RESPONSE({
                response,
                data: [],
              })
            );
          })
        )
      )
    )
  );
}
