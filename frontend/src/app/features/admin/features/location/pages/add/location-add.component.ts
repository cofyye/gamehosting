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
import { ILocationAddRequest } from '../../../../shared/models/location-request.model';
import { ISelectedCountry } from '../../../../../../shared/models/country.model';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import { ADD_LOCATION } from '../../../../shared/stores/location/location.actions';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrl: './location-add.component.css',
})
export class LocationAddComponent implements OnInit, OnDestroy {
  private loadingLocationAddSub!: Subscription;
  private locationAddSub!: Subscription;
  public isLoadingLocationAdd: boolean = false;

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _toaster: ToasterService,
    private readonly _store: Store<AppState>
  ) {}

  public locationAddForm: FormGroup = this._fb.group({
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
    this.loadingLocationAddSub = this._store
      .select(IS_LOADING('ADD_LOCATION_BTN'))
      .subscribe((value) => (this.isLoadingLocationAdd = value));
    this.locationAddSub = this._store
      .select(SELECT_HTTP_RESPONSE('ADD_LOCATION'))
      .subscribe((response) => {
        if (response?.success) {
          this.onResetLocation();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.loadingLocationAddSub) {
      this.loadingLocationAddSub.unsubscribe();
    }
    if (this.locationAddSub) {
      this.locationAddSub.unsubscribe();
    }
  }

  public onCountrySelected(selectedCountry: ISelectedCountry): void {
    if (selectedCountry.value) {
      this.locationAddForm.patchValue({
        country: selectedCountry.label,
      });
      this.locationAddForm.patchValue({
        countryTag: selectedCountry.value,
      });
    } else {
      this.locationAddForm.patchValue({
        country: '',
      });
      this.locationAddForm.patchValue({
        countryTag: '',
      });
    }
  }

  public onAddLocation(): void {
    if (this.locationAddFormHasErrors()) {
      return;
    }

    const data: ILocationAddRequest = {
      country: this.locationAddForm.get('country')?.value,
      countryTag: this.locationAddForm.get('countryTag')?.value,
      city: this.locationAddForm.get('city')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'ADD_LOCATION_BTN' }));
    this._store.dispatch(ADD_LOCATION({ payload: data }));
  }

  public onResetLocation(): void {
    this.resetSelectLocation();
    this.locationAddForm.reset();
  }

  private resetSelectLocation(): void {
    const countryDataIcon = this._el.nativeElement.querySelector('[data-icon]');
    const countryDataTitle =
      this._el.nativeElement.querySelector('[data-title]');

    if (countryDataIcon) {
      this._renderer.addClass(countryDataIcon, 'hidden');
      this._renderer.setProperty(countryDataIcon, 'innerHTML', 'null');
    }
    if (countryDataTitle) {
      this._renderer.setProperty(
        countryDataTitle,
        'innerHTML',
        'Select country...'
      );
    }
  }

  private locationAddFormHasErrors(): boolean {
    // Country Errors
    if (this.locationAddForm.get('country')?.errors?.['required']) {
      this._toaster.error('The country field must not be empty.', 'Error');
      return true;
    } else if (this.locationAddForm.get('country')?.errors?.['minlength']) {
      this._toaster.error(
        'The country must contain at least 2 characters.',
        'Error'
      );
      return true;
    } else if (this.locationAddForm.get('country')?.errors?.['maxlength']) {
      this._toaster.error(
        'The country must contain a maximum of 50 characters.',
        'Error'
      );
      return true;
    }

    // Tag Errors
    if (this.locationAddForm.get('tag')?.errors?.['required']) {
      this._toaster.error('The country tag field must not be empty.', 'Error');
      return true;
    } else if (this.locationAddForm.get('tag')?.errors?.['minlength']) {
      this._toaster.error(
        'The country tag must contain at least 2 characters.',
        'Error'
      );
      return true;
    } else if (this.locationAddForm.get('tag')?.errors?.['maxlength']) {
      this._toaster.error(
        'The country tag must contain a maximum of 10 characters.',
        'Error'
      );
      return true;
    }

    // City Errors
    if (this.locationAddForm.get('city')?.errors?.['required']) {
      this._toaster.error('The city field must not be empty.', 'Error');
      return true;
    } else if (this.locationAddForm.get('city')?.errors?.['minlength']) {
      this._toaster.error(
        'The city must contain at least 2 characters.',
        'Error'
      );
      return true;
    } else if (this.locationAddForm.get('city')?.errors?.['maxlength']) {
      this._toaster.error(
        'The city must contain a maximum of 50 characters.',
        'Error'
      );
      return true;
    }

    return false;
  }
}
