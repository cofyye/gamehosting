import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ADD_LOCATION } from '../../../../shared/stores/location/location.actions';
import { ILocationResponse } from '../../../../shared/models/location-response.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.css',
})
export class LocationEditComponent implements OnInit, OnDestroy {
  private loadingLocationEditSub!: Subscription;
  private routeSub!: Subscription;
  public isLoadingLocationEdit: boolean = false;
  public location!: ILocationResponse;

  constructor(
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
    });

    this.loadingLocationEditSub = this._store
      .select(IS_LOADING('EDIT_LOCATION_BTN'))
      .subscribe((value) => (this.isLoadingLocationEdit = value));
  }

  public ngOnDestroy(): void {
    if (this.loadingLocationEditSub) {
      this.loadingLocationEditSub.unsubscribe();
    }
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

  public onEditLocation(): void {
    if (this.locationEditFormHasErrors()) {
      return;
    }

    const data: ILocationEditRequest = {
      country: this.locationEditForm.get('country')?.value,
      countryTag: this.locationEditForm.get('countryTag')?.value,
      city: this.locationEditForm.get('city')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'EDIT_LOCATION_BTN' }));
    this._store.dispatch(ADD_LOCATION({ payload: data }));
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
