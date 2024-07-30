import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { IAcceptResponse } from '../../../shared/models/response.model';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService
  ) {}

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this._authService
          .register(action.payload)
          .pipe(
            map((response: IAcceptResponse) =>
              AuthActions.registerSuccess({ response })
            )
          )
      )
    )
  );
}
