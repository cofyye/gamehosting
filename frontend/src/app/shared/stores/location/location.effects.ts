import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as LocationActions from './location.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { STOP_LOADING } from '../loader/loader.actions';
import { LocationService } from '../../services/location.service';

@Injectable()
export class LocationEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _locationService: LocationService,
    private readonly _utilsService: UtilsService,
    private readonly _toasterService: ToasterService,
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  addLocation$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LocationActions.LOCATION_ADD),
      mergeMap((action) =>
        this._locationService.addLocation(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'LOCATION_ADD_BTN' }));

            return response;
          }),
          map(() => LocationActions.LOCATION_ADD_SUCCESS()),
          catchError((err: HttpErrorResponse) => {
            const error: IAcceptResponse = err.error as IAcceptResponse;

            this._utilsService.handleErrorToaster(error);

            this._store.dispatch(STOP_LOADING({ key: 'LOCATION_ADD_BTN' }));

            return of(LocationActions.LOCATION_ADD_FAILURE({ error: '' }));
          })
        )
      )
    )
  );
}
