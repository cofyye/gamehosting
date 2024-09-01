import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { catchError, first, Observable, of, switchMap } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { Actions, ofType } from '@ngrx/effects';
import { IPlanResponse } from '../models/plan-response.model';
import { LOAD_PLANS, LOAD_PLANS_RESPONSE } from '../stores/plan/plan.actions';
import { SELECT_PLANS } from '../stores/plan/plan.selectors';

@Injectable({
  providedIn: 'root',
})
class GetPlansService {
  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<IPlanResponse[]> {
    this._store.dispatch(LOAD_PLANS());

    return this._actions$.pipe(
      ofType(LOAD_PLANS_RESPONSE),
      first(),
      switchMap(() =>
        this._store.pipe(
          select(SELECT_PLANS),
          first(),
          catchError(() => of([]))
        )
      ),
      catchError(() => of([]))
    );
  }
}

export const getPlansResolver: ResolveFn<IPlanResponse[]> = (route, state) => {
  return inject(GetPlansService).resolve(route, state);
};
