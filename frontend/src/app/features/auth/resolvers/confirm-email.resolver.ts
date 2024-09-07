import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ResolveFn,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { CONFIRM_VERIFICATION } from '../../../shared/stores/auth/auth.actions';
import { ITokenRequest } from '../../../shared/models/auth/auth-request.model';
import { SELECT_HTTP_RESPONSE } from '../../../shared/stores/http/http.selectors';

@Injectable({
  providedIn: 'root',
})
class ConfirmEmailService {
  constructor(
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot
  ): Observable<boolean> {
    const email = route.queryParamMap.get('email') ?? '';
    const token = route.queryParamMap.get('token') ?? '';

    const data: ITokenRequest = {
      email,
      token,
    };

    this._store.dispatch(
      CONFIRM_VERIFICATION({
        payload: data,
      })
    );

    return this._store
      .select(SELECT_HTTP_RESPONSE('CONFIRM_VERIFICATION'))
      .pipe(
        map((_) => {
          this._router.navigate(['/auth/login']);
          return false;
        }),
        catchError(() => {
          this._router.navigate(['/auth/login']);
          return of(false);
        })
      );
  }
}

export const confirmEmailResolver: ResolveFn<boolean> = (route, state) => {
  return inject(ConfirmEmailService).resolve(route, state);
};
