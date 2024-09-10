import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as PlanActions from './plan.actions';
import * as HttpActions from '../../../../../shared/stores/http/http.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../../../shared/models/response.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { STOP_LOADING } from '../../../../../shared/stores/loader/loader.actions';
import { PlanService } from '../../services/plan.service';

@Injectable()
export class PlanEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _planService: PlanService,
    private readonly _utilsService: UtilsService,
    private readonly _store: Store<AppState>
  ) {}

  addPlan$ = createEffect(() =>
    this._actions$.pipe(
      ofType(PlanActions.ADD_PLAN),
      mergeMap((action) =>
        this._planService.addPlan(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'ADD_PLAN_BTN' }));

            return response;
          }),
          map((response) =>
            HttpActions.SET_RESPONSE({
              key: 'ADD_PLAN',
              response,
            })
          ),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'ADD_PLAN_BTN' }));

            return of(
              HttpActions.SET_RESPONSE({
                key: 'ADD_PLAN',
                response,
              })
            );
          })
        )
      )
    )
  );

  deletePlan$ = createEffect(() =>
    this._actions$.pipe(
      ofType(PlanActions.DELETE_PLAN),
      mergeMap((action) =>
        this._planService.deletePlan(action.payload).pipe(
          tap((response) => {
            this._utilsService.handleResponseToaster(response);

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_PLAN_BTN' }));

            return response;
          }),
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_PLAN', response })
            );

            return PlanActions.DELETE_PLAN_RESPONSE({
              data: action.payload,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(STOP_LOADING({ key: 'DELETE_PLAN_BTN' }));
            this._store.dispatch(
              HttpActions.SET_RESPONSE({ key: 'DELETE_PLAN', response })
            );

            return of(
              PlanActions.DELETE_PLAN_RESPONSE({
                data: '',
              })
            );
          })
        )
      )
    )
  );

  loadPlans$ = createEffect(() =>
    this._actions$.pipe(
      ofType(PlanActions.LOAD_PLANS),
      mergeMap(() =>
        this._planService.getPlans().pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_PLANS',
                response,
              })
            );

            return PlanActions.LOAD_PLANS_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_PLANS',
                response,
              })
            );

            return of(
              PlanActions.LOAD_PLANS_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );

  loadPlansByGameId$ = createEffect(() =>
    this._actions$.pipe(
      ofType(PlanActions.LOAD_PLANS_BY_GAME_ID),
      mergeMap((action) =>
        this._planService.getPlansByGameId(action.payload).pipe(
          map((response) => {
            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_PLANS_BY_GAME_ID',
                response,
              })
            );

            return PlanActions.LOAD_PLANS_BY_GAME_ID_RESPONSE({
              data: response.data,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const response: IAcceptResponse = err.error as IAcceptResponse;

            this._store.dispatch(
              HttpActions.SET_RESPONSE({
                key: 'LOAD_PLANS_BY_GAME_ID',
                response,
              })
            );

            return of(
              PlanActions.LOAD_PLANS_BY_GAME_ID_RESPONSE({
                data: [],
              })
            );
          })
        )
      )
    )
  );
}
