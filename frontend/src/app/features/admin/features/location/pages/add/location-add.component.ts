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
import { ILocationAddRequest } from '../../../../../../shared/models/location/location-request.model';
import { LOCATION_ADD } from '../../../../../../shared/stores/location/location.actions';
import { imageSizeValidator } from '../../../../../../shared/validators/image-size.validator';
import { imageExtensionValidator } from '../../../../../../shared/validators/image-extension.validator';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrl: './location-add.component.css',
})
export class LocationAddComponent implements OnInit, OnDestroy {
  private loadingLocationAddSub!: Subscription;
  public isLoadingLocationAdd: boolean = false;
  public allowedExtenstions = environment.IMAGE_EXTENSIONS.join(', ');
  public fileName: string | null = null;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AppState>
  ) {}

  public locationAddForm: FormGroup = this._fb.group({
    country: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z ]+'),
    ]),
    town: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z ]+'),
    ]),
    icon: new FormControl<File | null>(null, [
      Validators.required,
      imageExtensionValidator(),
      imageSizeValidator(),
    ]),
  });

  public ngOnInit(): void {
    this.loadingLocationAddSub = this._store
      .select(IS_LOADING('LOCATION_ADD_BTN'))
      .subscribe((value) => (this.isLoadingLocationAdd = value));
  }

  public ngOnDestroy(): void {
    if (this.loadingLocationAddSub) {
      this.loadingLocationAddSub.unsubscribe();
    }
  }

  onIconChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.fileName = file.name;
      this.locationAddForm.patchValue({
        icon: file,
      });

      this.locationAddForm.get('icon')?.markAsTouched();
    } else {
      this.fileName = null;
      this.locationAddForm.patchValue({
        icon: null,
      });
      this.locationAddForm.get('icon')?.markAsTouched();
    }
  }

  public onLocationAdd(): void {
    if (this.locationAddForm.invalid) {
      this.locationAddForm.markAllAsTouched();
      return;
    }

    const data: ILocationAddRequest = {
      country: this.locationAddForm.get('country')?.value,
      town: this.locationAddForm.get('town')?.value,
      icon: this.locationAddForm.get('icon')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'LOCATION_ADD_BTN' }));
    this._store.dispatch(LOCATION_ADD({ payload: data }));
  }
}
