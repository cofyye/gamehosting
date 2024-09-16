import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILoginStatus } from '../../../../../shared/models/user.model';
import { UserRole } from '../../../../../shared/enums/user.enum';
import { environment } from '../../../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { SELECT_AUTH } from '../../../../../shared/stores/auth/auth.selectors';
import { LOGOUT } from '../../../../../shared/stores/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  public auth!: ILoginStatus;
  public role = UserRole;
  public environment = environment;

  constructor(private readonly _store: Store<AppState>) {}

  public ngOnInit(): void {
    this.userSub = this._store
      .select(SELECT_AUTH)
      .subscribe((auth) => (this.auth = auth));
  }

  public ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  public onLogout(): void {
    this._store.dispatch(LOGOUT());
  }
}
