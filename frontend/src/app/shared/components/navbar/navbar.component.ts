import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILoginStatus } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { SELECT_AUTH } from '../../stores/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { UserRole } from '../../enums/user.enum';
import { environment } from '../../../../environments/environment';

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
}
