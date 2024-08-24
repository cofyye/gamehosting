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
    private readonly _store: Store<AppState>
  ) {}

  public machineAddForm: FormGroup = this._fb.group({
    locationId: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    ip: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.pattern(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      ),
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
      Validators.pattern(/^-?\d+$/),
    ]),
    ftpPort: new FormControl<number>(21, [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
      Validators.pattern(/^-?\d+$/),
    ]),
    games: new FormControl<string>('', [Validators.required]),
  });

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.locations = data['data']?.locations as ILocationResponse[];
      this.games = data['data']?.games as IGameResponse[];
    });

    this.loadingMachineAddSub = this._store
      .select(IS_LOADING('ADD_MACHINE_BTN'))
      .subscribe((value) => (this.isLoadingMachineAdd = value));
    // this.gameAddSub = this._store
    //   .select(SELECT_HTTP_RESPONSE('ADD_GAME'))
    //   .subscribe((response) => {
    //     if (response?.success) {
    //       const gameDataIcon =
    //         this._el.nativeElement.querySelector('[data-icon]');
    //       const gameDataTitle =
    //         this._el.nativeElement.querySelector('[data-title]');
    //       if (gameDataIcon) {
    //         this._renderer.addClass(gameDataIcon, 'hidden');
    //         this._renderer.setProperty(gameDataIcon, 'innerHTML', 'null');
    //       }
    //       if (gameDataTitle) {
    //         this._renderer.setProperty(
    //           gameDataTitle,
    //           'innerHTML',
    //           'Select game...'
    //         );
    //       }
    //       this.gameAddForm.reset();
    //     }
    //   });
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
  // public onGameSelected(selectedGame: ISelectedGame): void {
  //   console.log(selectedGame);
  //   if (selectedGame.value) {
  //     this.gameAddForm.patchValue({
  //       name: selectedGame.label,
  //     });
  //     this.gameAddForm.patchValue({
  //       tag: selectedGame.value,
  //     });
  //     this.gameAddForm.get('name')?.markAsTouched();
  //   } else {
  //     this.gameAddForm.patchValue({
  //       name: '',
  //     });
  //     this.gameAddForm.patchValue({
  //       tag: '',
  //     });
  //     this.gameAddForm.get('name')?.markAsTouched();
  //   }
  // }

  public onAddMachine(): void {
    // if (this.locationAddFormHasErrors()) {
    //   return;
    // }

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
}
