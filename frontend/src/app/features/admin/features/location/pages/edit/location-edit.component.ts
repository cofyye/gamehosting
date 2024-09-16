import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app.state';
import { Subscription } from 'rxjs';
import { IS_LOADING } from '../../../../../../shared/stores/loader/loader.selectors';
import { START_LOADING } from '../../../../../../shared/stores/loader/loader.actions';
import { ILocationEditRequest } from '../../../../shared/models/location-request.model';
import { ISelectedCountry } from '../../../../../../shared/models/country.model';
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import { EDIT_LOCATION } from '../../../../shared/stores/location/location.actions';
import { ILocationResponse } from '../../../../shared/models/location-response.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.css',
})
export class LocationEditComponent implements OnInit, OnDestroy {
  private loadingLocationEditSub!: Subscription;
  private locationEditSub!: Subscription;
  private routeSub!: Subscription;
  public isLoadingLocationEdit: boolean = false;
  public location!: ILocationResponse;

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _toaster: ToasterService,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public locationEditForm: FormGroup = this._fb.group({
    country: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    countryTag: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
    ]),
    city: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
  });

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.location = data['location'] as ILocationResponse;

      this.onResetLocation();
    });

    this.loadingLocationEditSub = this._store
      .select(IS_LOADING('EDIT_LOCATION_BTN'))
      .subscribe((value) => (this.isLoadingLocationEdit = value));

    this.locationEditSub = this._store
      .select(SELECT_HTTP_RESPONSE('EDIT_LOCATION'))
      .subscribe((response) => {
        if (response?.success) {
          this.location = {
            id: this.location.id,
            country: this.locationEditForm.get('country')?.value,
            countryTag: this.locationEditForm.get('countryTag')?.value,
            city: this.locationEditForm.get('city')?.value,
          };
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.loadingLocationEditSub) {
      this.loadingLocationEditSub.unsubscribe();
    }
    if (this.locationEditSub) {
      this.locationEditSub.unsubscribe();
    }
  }

  public onResetLocation(): void {
    setTimeout(() => {
      this.resetSelectLocation();
      this.locationEditForm.patchValue({
        country: this.location.country,
        tag: this.location.countryTag,
        city: this.location.city,
      });
    }, 100);
  }

  public onCountrySelected(selectedCountry: ISelectedCountry): void {
    if (selectedCountry.value) {
      this.locationEditForm.patchValue({
        country: selectedCountry.label,
      });
      this.locationEditForm.patchValue({
        countryTag: selectedCountry.value,
      });
    } else {
      this.locationEditForm.patchValue({
        country: '',
      });
      this.locationEditForm.patchValue({
        countryTag: '',
      });
    }
  }

  public resetSelectLocation(): void {
    const countryDataIcon = this._el.nativeElement.querySelector('[data-icon]');
    const countryDataTitle =
      this._el.nativeElement.querySelector('[data-title]');

    if (countryDataIcon) {
      this._renderer.removeClass(countryDataIcon, 'hidden');
      this._renderer.setProperty(
        countryDataIcon,
        'innerHTML',
        `<img class='inline-block size-4 rounded-full' src='${environment.API_URL}/assets/flags/1x1/${this.location.countryTag}.svg' alt='${this.location.country}' />`
      );
    }
    if (countryDataTitle) {
      this._renderer.setProperty(
        countryDataTitle,
        'innerHTML',
        `${this.location.country}`
      );
    }
  }

  public onEditLocation(): void {
    if (this.locationEditFormHasErrors()) {
      return;
    }

    const data: ILocationEditRequest = {
      id: this.location.id,
      country: this.locationEditForm.get('country')?.value,
      countryTag: this.locationEditForm.get('countryTag')?.value,
      city: this.locationEditForm.get('city')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'EDIT_LOCATION_BTN' }));
    this._store.dispatch(EDIT_LOCATION({ payload: data }));
  }

  private locationEditFormHasErrors(): boolean {
    // Country Errors
    if (this.locationEditForm.get('country')?.errors?.['required']) {
      this._toaster.error('The country field must not be empty.', 'Error');
      return true;
    } else if (this.locationEditForm.get('country')?.errors?.['minlength']) {
      this._toaster.error(
        'The country must contain at least 2 characters.',
        'Error'
      );
      return true;
    } else if (this.locationEditForm.get('country')?.errors?.['maxlength']) {
      this._toaster.error(
        'The country must contain a maximum of 50 characters.',
        'Error'
      );
      return true;
    }

    // Tag Errors
    if (this.locationEditForm.get('tag')?.errors?.['required']) {
      this._toaster.error('The country tag field must not be empty.', 'Error');
      return true;
    } else if (this.locationEditForm.get('tag')?.errors?.['minlength']) {
      this._toaster.error(
        'The country tag must contain at least 2 characters.',
        'Error'
      );
      return true;
    } else if (this.locationEditForm.get('tag')?.errors?.['maxlength']) {
      this._toaster.error(
        'The country tag must contain a maximum of 10 characters.',
        'Error'
      );
      return true;
    }

    // City Errors
    if (this.locationEditForm.get('city')?.errors?.['required']) {
      this._toaster.error('The city field must not be empty.', 'Error');
      return true;
    } else if (this.locationEditForm.get('city')?.errors?.['minlength']) {
      this._toaster.error(
        'The city must contain at least 2 characters.',
        'Error'
      );
      return true;
    } else if (this.locationEditForm.get('city')?.errors?.['maxlength']) {
      this._toaster.error(
        'The city must contain a maximum of 50 characters.',
        'Error'
      );
      return true;
    }

    return false;
  }
}
