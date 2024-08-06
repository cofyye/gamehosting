import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILocation } from '../../../../../../shared/models/location/location.model';

@Component({
  selector: 'app-location-all',
  templateUrl: './location-all.component.html',
  styleUrl: './location-all.component.css',
})
export class LocationAllComponent implements OnInit {
  locations: ILocation[] = [];

  constructor(private readonly _route: ActivatedRoute) {}

  public ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.locations = data['locations'];
    });
  }
}
