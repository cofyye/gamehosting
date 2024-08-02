import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable, map, take } from 'rxjs';
import { ToasterService } from '../services/toaster.service';
import { SELECT_AUTH_STATE } from '../stores/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
class AuthenticatedService {
  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<boolean> {
    return this._store.select(SELECT_AUTH_STATE).pipe(
      take(1),
      map((user) => {
        if (!user.auth.loggedIn) {
          this._toasterService.error(
            'You cannot access this page because you are logged out.',
            'Error'
          );

          this._router.navigate(['/']);

          return false;
        }

        return true;
      })
    );
  }
}

export const authenticatedGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  return inject(AuthenticatedService).canActivate(route, state);
};
