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
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ILocationResponse } from '../../../../shared/models/location-response.model';
import { IMachineAddRequest } from '../../../../shared/models/machine-request.model';
import { IGameResponse } from '../../../../shared/models/game-response.model';
import { ADD_MACHINE } from '../../../../shared/stores/machine/machine.actions';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import { uuidValidator } from '../../../../../../shared/validators/uuid.validator';
import { ipv4Validator } from '../../../../../../shared/validators/ipv4.validator';
import { isIntValidator } from '../../../../../../shared/validators/integer.validator';

@Component({
  selector: 'app-machine-add',
  templateUrl: './machine-add.component.html',
  styleUrl: './machine-add.component.css',
})
export class MachineAddComponent implements OnInit, OnDestroy {
  private loadingMachineAddSub!: Subscription;
  private machineAddSub!: Subscription;
  private routeSub!: Subscription;
  public isLoadingMachineAdd: boolean = false;
  public locations: ILocationResponse[] = [];
  public games: IGameResponse[] = [];

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _toaster: ToasterService,
    private readonly _store: Store<AppState>
  ) {}

  public machineAddForm: FormGroup = this._fb.group({
    locationId: new FormControl<string>('', [
      Validators.required,
      uuidValidator(),
    ]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    ip: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(15),
      ipv4Validator(),
    ]),
    username: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    sshPort: new FormControl<number>(22, [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
      isIntValidator(),
    ]),
    ftpPort: new FormControl<number>(21, [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
      isIntValidator(),
    ]),
    games: new FormControl<string>('123', [Validators.required]),
  });

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.locations = data['data']?.locations as ILocationResponse[];
      this.games = data['data']?.games as IGameResponse[];
    });

    this.loadingMachineAddSub = this._store
      .select(IS_LOADING('ADD_MACHINE_BTN'))
      .subscribe((value) => (this.isLoadingMachineAdd = value));

    this.machineAddSub = this._store
      .select(SELECT_HTTP_RESPONSE('ADD_MACHINE'))
      .subscribe((response) => {
        if (response?.success) {
          this.onResetMachine();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.loadingMachineAddSub) {
      this.loadingMachineAddSub.unsubscribe();
    }
    if (this.machineAddSub) {
      this.machineAddSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  public onAddMachine(): void {
    if (this.machineAddFormHasErrors()) {
      return;
    }

    const data: IMachineAddRequest = {
      locationId: this.machineAddForm.get('locationId')?.value,
      name: this.machineAddForm.get('name')?.value,
      ip: this.machineAddForm.get('ip')?.value,
      username: this.machineAddForm.get('username')?.value,
      password: this.machineAddForm.get('password')?.value,
      sshPort: this.machineAddForm.get('sshPort')?.value,
      ftpPort: this.machineAddForm.get('ftpPort')?.value,
      games: this.machineAddForm.get('games')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'ADD_MACHINE_BTN' }));
    this._store.dispatch(ADD_MACHINE({ payload: data }));
  }

  public onResetMachine(): void {
    this.resetSelectGames();
    this.resetSelectLocation();
    this.machineAddForm.reset();
    this.machineAddForm.patchValue({
      sshPort: 22,
      ftpPort: 21,
    });
  }

  public onSelectLocation(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.machineAddForm.patchValue({
      locationId: selectEl.value,
    });
  }

  public onSelectGames(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    const selectedValues = Array.from(selectEl.selectedOptions).map(
      (option) => option.value
    );
    this.machineAddForm.patchValue({
      games: JSON.stringify(selectedValues),
    });
  }

  public generateLocationSelectOption(location: ILocationResponse): string {
    return JSON.stringify({
      icon: `<img class="shrink-0 size-5 rounded-md" src="${environment.API_URL}/assets/flags/1x1/${location.countryTag}.svg" alt="${location.country}" />`,
    });
  }

  public generateGameSelectOption(game: IGameResponse): string {
    return JSON.stringify({
      icon: `<img class="shrink-0 size-5 rounded-md" src="${environment.API_URL}/assets/games/${game.tag}.png" alt="${game.name}" />`,
    });
  }

  private resetSelectLocation(): void {
    const countryDataIcon = this._el.nativeElement.querySelector(
      'button[id="machine-location-btn"] > [data-icon]'
    );
    const countryDataTitle = this._el.nativeElement.querySelector(
      'button[id="machine-location-btn"] > [data-title]'
    );
    const selectedLocation = this._el.nativeElement.querySelector(
      'div.data-machine-location > div.selected'
    );

    if (countryDataIcon) {
      this._renderer.addClass(countryDataIcon, 'hidden');
      this._renderer.setProperty(countryDataIcon, 'innerHTML', 'null');
    }
    if (countryDataTitle) {
      this._renderer.setProperty(
        countryDataTitle,
        'innerHTML',
        'Select machine location...'
      );
    }
    if (selectedLocation) {
      this._renderer.removeClass(selectedLocation, 'selected');
    }
  }

  private resetSelectGames(): void {
    const gameSpanText = this._el.nativeElement.querySelector(
      'button[id="machine-games-btn"] > span'
    );

    const allGames = this._el.nativeElement.querySelectorAll(
      '[data-value]'
    ) as HTMLDivElement[];

    allGames.forEach(
      (item) => item.classList.contains('selected') && item.click()
    );

    if (gameSpanText) {
      this._renderer.setProperty(
        gameSpanText,
        'innerHTML',
        'Select games for machine...'
      );
    }
  }

  private machineAddFormHasErrors(): boolean {
    // LocationId Errors
    if (this.machineAddForm.get('locationId')?.errors?.['required']) {
      this._toaster.error('The location ID field must not be empty.', 'Error');
      return true;
    }

    if (this.machineAddForm.get('locationId')?.errors?.['invalidUuid']) {
      this._toaster.error('The location ID is not valid.', 'Error');
      return true;
    }

    // Name Errors
    if (this.machineAddForm.get('name')?.errors?.['required']) {
      this._toaster.error('The name field must not be empty.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('name')?.errors?.['minlength']) {
      this._toaster.error(
        'The name must contain at least 2 characters.',
        'Error'
      );
      return true;
    }
    if (this.machineAddForm.get('name')?.errors?.['maxlength']) {
      this._toaster.error(
        'The name must contain a maximum of 50 characters.',
        'Error'
      );
      return true;
    }

    // IP Errors
    if (this.machineAddForm.get('ip')?.errors?.['required']) {
      this._toaster.error('The IP field must not be empty.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('ip')?.errors?.['invalidIPv4']) {
      this._toaster.error('Please enter a valid IP address.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('ip')?.errors?.['maxlength']) {
      this._toaster.error(
        'The IP must contain a maximum of 15 characters.',
        'Error'
      );
      return true;
    }

    // Username Errors
    if (this.machineAddForm.get('username')?.errors?.['required']) {
      this._toaster.error('The username field must not be empty.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('username')?.errors?.['maxlength']) {
      this._toaster.error(
        'The username must contain a maximum of 20 characters.',
        'Error'
      );
      return true;
    }

    // Password Errors
    if (this.machineAddForm.get('password')?.errors?.['required']) {
      this._toaster.error('The password field must not be empty.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('password')?.errors?.['maxlength']) {
      this._toaster.error(
        'The password must contain a maximum of 100 characters.',
        'Error'
      );
      return true;
    }

    // SSH Port Errors
    if (this.machineAddForm.get('sshPort')?.errors?.['required']) {
      this._toaster.error('The SSH port field must not be empty.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('sshPort')?.errors?.['notInteger']) {
      this._toaster.error('The SSH port must be in numeric format.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('sshPort')?.errors?.['min']) {
      this._toaster.error(
        'The minimum value for the SSH port must be 1.',
        'Error'
      );
      return true;
    }
    if (this.machineAddForm.get('sshPort')?.errors?.['max']) {
      this._toaster.error(
        'The maximum value for the SSH port must be 65535.',
        'Error'
      );
      return true;
    }

    // FTP Port Errors
    if (this.machineAddForm.get('ftpPort')?.errors?.['required']) {
      this._toaster.error('The FTP port field must not be empty.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('ftpPort')?.errors?.['notInteger']) {
      this._toaster.error('The FTP port must be in numeric format.', 'Error');
      return true;
    }
    if (this.machineAddForm.get('ftpPort')?.errors?.['min']) {
      this._toaster.error(
        'The minimum value for the FTP port must be 1.',
        'Error'
      );
      return true;
    }
    if (this.machineAddForm.get('ftpPort')?.errors?.['max']) {
      this._toaster.error(
        'The maximum value for the FTP port must be 65535.',
        'Error'
      );
      return true;
    }

    // Games Errors
    if (this.machineAddForm.get('games')?.errors?.['required']) {
      this._toaster.error('The games field must not be empty.', 'Error');
      return true;
    }

    return false;
  }
}
