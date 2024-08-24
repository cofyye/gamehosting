import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as LocationActions from './location.actions';
import * as HttpActions from '../../../../../shared/stores/http/http.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../../../shared/models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { STOP_LOADING } from '../../../../../shared/stores/loader/loader.actions';
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
            HttpActions.SET_RESPONSE({
              key: 'ADD_LOCATION',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'ADD_LOCATION_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'ADD_LOCATION',
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
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_LOCATION', response })
            );

            return LocationActions.DELETE_LOCATION_RESPONSE({
              data: action.payload,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_LOCATION_BTN' }));
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_LOCATION', response })
            );

            return of(
              LocationActions.DELETE_LOCATION_RESPONSE({
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
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_LOCATIONS',
                response,
              })
            );

            return LocationActions.LOAD_LOCATIONS_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_LOCATIONS',
                response,
              })
            );

            return of(
              LocationActions.LOAD_LOCATIONS_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );
}
