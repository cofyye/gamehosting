import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  Event,
  NavigationStart,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
import NProgress from 'nprogress';

import { IStaticMethods } from 'preline/preline';
import { Subscription } from 'rxjs';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private routerEventsSubscription!: Subscription;

  constructor(private readonly _router: Router) {}

  public ngOnInit(): void {
    NProgress.configure({ showSpinner: false });

    this.routerEventsSubscription = this._router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            window.HSStaticMethods.autoInit();
          }, 100);
        }

        if (event instanceof NavigationStart) {
          NProgress.start();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel
        ) {
          NProgress.done();
        }
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }
}
