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
import { UserRole } from '../enums/user.enum';

@Injectable({
  providedIn: 'root',
})
class RoleService {
  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  canActivate(
    allowedRoles: UserRole[],
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<boolean> {
    return this._store.select(SELECT_AUTH_STATE).pipe(
      take(1),
      map((user) => {
        const userRole = user.auth.user?.role;

        if (!userRole) {
          this._toasterService.error(
            'You do not have permission to access this page.',
            'Error'
          );
          this._router.navigate(['/']);
          return false;
        }

        if (!allowedRoles.includes(userRole)) {
          this._toasterService.error(
            'You do not have permission to access this page.',
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

export const roleGuard =
  (allowedRoles: UserRole[]): CanActivateFn =>
  (route, state): Observable<boolean> => {
    return inject(RoleService).canActivate(allowedRoles, route, state);
  };
