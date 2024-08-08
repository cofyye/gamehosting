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
import { ILocationAddRequest } from '../../../../../../shared/models/location/location-request.model';
import { LOCATION_ADD } from '../../../../../../shared/stores/location/location.actions';
import { SELECT_LOCATION_RESPONSE } from '../../../../../../shared/stores/location/location.selectors';
import { ISelectedCountry } from '../../../../../../shared/models/country.model';

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
    town: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
  });

  public ngOnInit(): void {
    this.loadingLocationAddSub = this._store
      .select(IS_LOADING('LOCATION_ADD_BTN'))
      .subscribe((value) => (this.isLoadingLocationAdd = value));
    this.locationAddSub = this._store
      .select(SELECT_LOCATION_RESPONSE)
      .subscribe((response) => {
        if (response?.success) {
          const countryDataIcon =
            this._el.nativeElement.querySelector('[data-icon]');
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

          this.locationAddForm.reset();
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

      this.locationAddForm.get('country')?.markAsTouched();
    } else {
      this.locationAddForm.patchValue({
        country: '',
      });
      this.locationAddForm.patchValue({
        countryTag: '',
      });
      this.locationAddForm.get('country')?.markAsTouched();
    }
  }

  public onCountryBlur(): void {
    this.locationAddForm.get('country')?.markAsTouched();
  }

  public onLocationAdd(): void {
    if (this.locationAddForm.invalid) {
      this.locationAddForm.markAllAsTouched();
      return;
    }

    const data: ILocationAddRequest = {
      country: this.locationAddForm.get('country')?.value,
      countryTag: this.locationAddForm.get('countryTag')?.value,
      town: this.locationAddForm.get('town')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'LOCATION_ADD_BTN' }));
    this._store.dispatch(LOCATION_ADD({ payload: data }));
  }
}
