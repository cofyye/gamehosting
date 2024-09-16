import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as MachineActions from './machine.actions';
import * as HttpActions from '../../../../../shared/stores/http/http.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../../../shared/models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { STOP_LOADING } from '../../../../../shared/stores/loader/loader.actions';
import { MachineService } from '../../../shared/services/machine.service';

@Injectable()
export class MachineEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _machineService: MachineService,
    private readonly _utilsService: UtilsService,
    private readonly _store: Store<AppState>
  ) {}

  addMachine$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MachineActions.ADD_MACHINE),
      mergeMap((action) =>
        this._machineService.addMachine(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'ADD_MACHINE_BTN' }));

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'ADD_MACHINE',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'ADD_MACHINE_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'ADD_MACHINE',
                response,
              })
            );
          })
        )
      )
    )
  );

  deleteMachine$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MachineActions.DELETE_MACHINE),
      mergeMap((action) =>
        this._machineService.deleteMachine(action.id).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_MACHINE_BTN' }));

            return response;
          }),
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_MACHINE', response })
            );

            return MachineActions.DELETE_MACHINE_RESPONSE({
              id: action.id,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_MACHINE_BTN' }));
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_MACHINE', response })
            );

            return of(
              MachineActions.DELETE_MACHINE_RESPONSE({
                id: '',
              })
            );
          })
        )
      )
    )
  );

  loadMachines$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MachineActions.LOAD_MACHINES),
      mergeMap(() =>
        this._machineService.getMachines().pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_MACHINES',
                response,
              })
            );

            return MachineActions.LOAD_MACHINES_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_MACHINES',
                response,
              })
            );

            return of(
              MachineActions.LOAD_MACHINES_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );
}
