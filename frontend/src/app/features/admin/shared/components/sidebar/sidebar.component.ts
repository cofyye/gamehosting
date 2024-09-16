import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILoginStatus } from '../../../../../shared/models/user.model';
import { UserRole } from '../../../../../shared/enums/user.enum';
import { environment } from '../../../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app.state';
import { SELECT_AUTH } from '../../../../../shared/stores/auth/auth.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
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
