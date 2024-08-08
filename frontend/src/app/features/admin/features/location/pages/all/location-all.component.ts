import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILocationResponse } from '../../../../../../shared/models/location/location-response.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location-all',
  templateUrl: './location-all.component.html',
  styleUrl: './location-all.component.css',
})
export class LocationAllComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  public locations: ILocationResponse[] = [];

  constructor(private readonly _route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.locations = data['locations'];
    });
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
