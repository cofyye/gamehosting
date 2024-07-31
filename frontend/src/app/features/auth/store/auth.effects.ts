import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { ToasterService } from '../../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IAcceptResponse } from '../../../shared/models/response.model';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _toasterService: ToasterService
  ) {}

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.REGISTER),
      mergeMap((action) =>
        this._authService.register(action.payload).pipe(
          tap((response) => {
            if (response.success) {
              this._toasterService.success(response.message, 'Success');
            } else {
              this._toasterService.error(response.message, 'Error');
            }

            return response;
          }),
          map((response) => AuthActions.REGISTER_SUCCESS({ response })),
          catchError((err: HttpErrorResponse) => {
            const error: IAcceptResponse = err.error as IAcceptResponse;

            if (error?.success === false) {
              this._toasterService.error(error?.message, 'Error');
            } else {
              this._toasterService.error(
                'An error occurred. Please report this to the administrator.',
                'Error'
              );
            }

            return of(AuthActions.REGISTER_FAILURE({ error: '' }));
          })
        )
      )
    )
  );
}
