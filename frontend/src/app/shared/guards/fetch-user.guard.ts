import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { SELECT_AUTH_STATE } from '../stores/auth/auth.selectors';
import { IDataAcceptResponse } from '../models/response.model';
import { environment } from '../../../environments/environment';
import { ILoginStatus } from '../models/user.model';
import { START_LOADING, STOP_LOADING } from '../stores/loader/loader.actions';
import { SAVE_AUTH } from '../stores/auth/auth.actions';
import { UserRole } from '../enums/user.enum';

@Injectable({
  providedIn: 'root',
})
class FetchGuardService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _store: Store<AppState>
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<boolean> {
    return this._store.select(SELECT_AUTH_STATE).pipe(
      take(1),
      switchMap((user) => {
        if (user.auth.fetched) {
          return of(true);
        } else {
          this._store.dispatch(START_LOADING({ key: 'global-loader' }));

          return this._httpClient
            .post<IDataAcceptResponse<ILoginStatus>>(
              `${environment.API_URL}/auth/check/session`,
              {}
            )
            .pipe(
              take(1),
              switchMap((response) => {
                if (response.success) {
                  this._store.dispatch(
                    SAVE_AUTH({
                      auth: {
                        id: response.data.id,
                        role: response.data.role,
                        expirationDate: response.data.expirationDate,
                        fetched: true,
                        loggedIn: true,
                      },
                    })
                  );
                } else {
                  this._store.dispatch(
                    SAVE_AUTH({
                      auth: {
                        id: '',
                        role: UserRole.USER,
                        expirationDate: null,
                        fetched: true,
                        loggedIn: false,
                      },
                    })
                  );
                }

                this._store.dispatch(STOP_LOADING({ key: 'global-loader' }));

                return of(true);
              }),
              catchError(() => {
                this._store.dispatch(
                  SAVE_AUTH({
                    auth: {
                      id: '',
                      role: UserRole.USER,
                      expirationDate: null,
                      fetched: true,
                      loggedIn: false,
                    },
                  })
                );
                this._store.dispatch(STOP_LOADING({ key: 'global-loader' }));

                return of(true);
              })
            );
        }
      })
    );
  }
}

export const fetchUserGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  return inject(FetchGuardService).canActivate(next, state);
};
