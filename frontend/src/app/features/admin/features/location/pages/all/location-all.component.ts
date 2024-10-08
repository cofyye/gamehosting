import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILocationResponse } from '../../../../shared/models/location-response.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app.state';
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import { IS_LOADING } from '../../../../../../shared/stores/loader/loader.selectors';
import { START_LOADING } from '../../../../../../shared/stores/loader/loader.actions';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import {
  SELECT_LOCATIONS,
  SELECT_SELECTED_LOCATION,
} from '../../../../shared/stores/location/location.selectors';
import {
  DELETE_LOCATION,
  REMOVE_SELECTED_LOCATION,
  SET_SELECTED_LOCATION,
} from '../../../../shared/stores/location/location.actions';

@Component({
  selector: 'app-location-all',
  templateUrl: './location-all.component.html',
  styleUrl: './location-all.component.css',
})
export class LocationAllComponent implements OnInit, OnDestroy {
  @ViewChild('deleteLocationAlertCloseButton')
  deleteLocationAlertCloseButton!: ElementRef<HTMLButtonElement>;

  private routeSub!: Subscription;
  private locationDeleteSub!: Subscription;
  private loadingLocationDeleteSub!: Subscription;
  private getLocationsSub!: Subscription;
  public locations: ILocationResponse[] = [];
  public environment = environment;
  public selectedLocation: ILocationResponse | null | undefined = null;
  public selectedLocationSub!: Subscription;
  public isLoadingLocationDelete: boolean = false;

  constructor(
    private readonly _toaster: ToasterService,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.locations = data['locations'] as ILocationResponse[];
    });

    this.loadingLocationDeleteSub = this._store
      .select(IS_LOADING('DELETE_LOCATION_BTN'))
      .subscribe((value) => (this.isLoadingLocationDelete = value));

    this.selectedLocationSub = this._store
      .select(SELECT_SELECTED_LOCATION)
      .subscribe((location) => {
        this.selectedLocation = location;
      });

    this.locationDeleteSub = this._store
      .select(SELECT_HTTP_RESPONSE('DELETE_LOCATION'))
      .subscribe((_) => {
        this.onDeselectLocation();
        if (this.deleteLocationAlertCloseButton) {
          this.deleteLocationAlertCloseButton.nativeElement.click();
        }
      });

    this.getLocationsSub = this._store
      .select(SELECT_LOCATIONS)
      .subscribe((locations) => {
        this.locations = locations;
      });
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.selectedLocationSub) {
      this.selectedLocationSub.unsubscribe();
    }
    if (this.loadingLocationDeleteSub) {
      this.loadingLocationDeleteSub.unsubscribe();
    }
    if (this.locationDeleteSub) {
      this.locationDeleteSub.unsubscribe();
    }
    if (this.getLocationsSub) {
      this.getLocationsSub.unsubscribe();
    }
  }

  public onSelectLocation(id: string): void {
    this._store.dispatch(SET_SELECTED_LOCATION({ id }));
  }

  public onDeselectLocation(): void {
    setTimeout(() => this._store.dispatch(REMOVE_SELECTED_LOCATION()), 100);
  }

  public onDeleteLocation(): void {
    const id = this.selectedLocation?.id;
    if (id) {
      this._store.dispatch(START_LOADING({ key: 'DELETE_LOCATION_BTN' }));
      this._store.dispatch(DELETE_LOCATION({ id }));
    } else {
      this._toaster.error(
        'No location selected, deletion has been aborted.',
        'Error'
      );
      this.onDeselectLocation();
      if (this.deleteLocationAlertCloseButton) {
        this.deleteLocationAlertCloseButton.nativeElement.click();
      }
    }
  }
}
