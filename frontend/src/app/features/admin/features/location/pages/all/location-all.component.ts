import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILocationResponse } from '../../../../../../shared/models/location/location-response.model';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app.state';
import { SELECT_LOCATION } from '../../../../../../shared/stores/location/location.actions';
import { SELECT_SELECTED_LOCATION } from '../../../../../../shared/stores/location/location.selectors';

@Component({
  selector: 'app-location-all',
  templateUrl: './location-all.component.html',
  styleUrl: './location-all.component.css',
})
export class LocationAllComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  public locations: ILocationResponse[] = [];
  public environment = environment;
  public selectedLocation: ILocationResponse | null | undefined = null;
  public selectedLocationSub!: Subscription;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.locations = data['locations'];
    });

    // this.selectedLocationSub = this._store
    //   .select(SELECT_SELECTED_LOCATION)
    //   .subscribe((location) => {
    //     this.selectedLocation = location;
    //   });
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.selectedLocationSub) {
      this.selectedLocationSub.unsubscribe();
    }
  }

  selectLocation(id: string): void {
    this._store.dispatch(SELECT_LOCATION({ id }));
  }
}
