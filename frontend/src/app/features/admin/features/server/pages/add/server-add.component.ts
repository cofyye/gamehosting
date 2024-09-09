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
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { uuidValidator } from '../../../../../../shared/validators/uuid.validator';
import { ActivatedRoute } from '@angular/router';
import { IGameResponse } from '../../../../shared/models/game-response.model';
import { isUnsignedIntValidator } from '../../../../../../shared/validators/unsigned-integer.validator';
import * as moment from 'moment';
import { IModResponse } from '../../../../shared/models/mod-response.model';
import { IPlanResponse } from '../../../../shared/models/plan-response.model';
import { IUserResponse } from '../../../../shared/models/user-response.model';
import { IMachineResponse } from '../../../../shared/models/machine-response.model';
import { IServerAddRequest } from '../../../../shared/models/server-request.model';
import { unsignedNumericValidator } from '../../../../../../shared/validators/unsigned-numeric.validator';

@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html',
  styleUrl: './server-add.component.css',
})
export class ServerAddComponent implements OnInit, OnDestroy {
  private loadingServerAddSub!: Subscription;
  private serverAddSub!: Subscription;
  private routeSub!: Subscription;
  public isLoadingServerAdd: boolean = false;
  public games: IGameResponse[] = [];
  public mods: IModResponse[] = [];
  public plans: IPlanResponse[] = [];
  public users: IUserResponse[] = [];
  public machines: IMachineResponse[] = [];

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public serverAddForm: FormGroup = this._fb.group({
    gameId: new FormControl<string>('', [Validators.required, uuidValidator()]),
    modId: new FormControl<string>('', [Validators.required, uuidValidator()]),
    userId: new FormControl<string>('', [Validators.required, uuidValidator()]),
    machineId: new FormControl<string>('', [
      Validators.required,
      uuidValidator(),
    ]),
    planId: new FormControl<string>('', [Validators.required, uuidValidator()]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
    ]),
    port: new FormControl<string>('', [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
      isUnsignedIntValidator(),
    ]),
    customPrice: new FormControl<number>(0, [
      Validators.min(0),
      Validators.max(100000),
      unsignedNumericValidator(),
    ]),
    expirationDate: new FormControl<Date>(moment.utc().toDate(), [
      Validators.required,
    ]),
  });

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.users = data['users'] as IUserResponse[];
    });

    this.loadingServerAddSub = this._store
      .select(IS_LOADING('ADD_SERVER_BTN'))
      .subscribe((value) => (this.isLoadingServerAdd = value));

    this.serverAddSub = this._store
      .select(SELECT_HTTP_RESPONSE('ADD_SERVER'))
      .subscribe((response) => {
        if (response?.success) {
          this.onResetServer();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.loadingServerAddSub) {
      this.loadingServerAddSub.unsubscribe();
    }
    if (this.serverAddSub) {
      this.serverAddSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  public onAddServer(): void {
    // if (this.modAddFormHasErrors()) {
    //   return;
    // }

    const data: IServerAddRequest = {
      gameId: this.serverAddForm.get('gameId')?.value,
      modId: this.serverAddForm.get('modId')?.value,
      machineId: this.serverAddForm.get('machineId')?.value,
      planId: this.serverAddForm.get('planId')?.value,
      userId: this.serverAddForm.get('userId')?.value,
      name: this.serverAddForm.get('name')?.value,
      customPrice: this.serverAddForm.get('customPrice')?.value,
      port: this.serverAddForm.get('port')?.value,
      expirationDate: this.serverAddForm.get('expirationDate')?.value,
    };

    // this._store.dispatch(START_LOADING({ key: 'ADD_SERVER_BTN' }));
    // this._store.dispatch(ADD_MOD({ payload: data }));
  }

  public onResetServer(): void {
    this.resetSelectGame();
    this.resetSelectMod();
    this.resetSelectPlan();
    this.resetSelectUser();
    this.resetSelectMachine();
    this.serverAddForm.reset();
  }

  public onSelectGame(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      gameId: selectEl.value,
    });
  }

  public generateGameSelectOption(game: IGameResponse): string {
    return JSON.stringify({
      icon: `<img class="shrink-0 size-5 rounded-md" src="${environment.API_URL}/assets/games/${game.tag}.png" alt="${game.name}" />`,
    });
  }

  private resetSelectGame(): void {
    const gameDataIcon = this._el.nativeElement.querySelector(
      'button[id="server-game-btn"] > [data-icon]'
    );
    const gameDataTitle = this._el.nativeElement.querySelector(
      'button[id="server-game-btn"] > [data-title]'
    );
    const selectedGame = this._el.nativeElement.querySelector(
      'div.data-server-game > div.selected'
    );
    if (gameDataIcon) {
      this._renderer.addClass(gameDataIcon, 'hidden');
      this._renderer.setProperty(gameDataIcon, 'innerHTML', 'null');
    }
    if (gameDataTitle) {
      this._renderer.setProperty(
        gameDataTitle,
        'innerHTML',
        'Select game for server...'
      );
    }
    if (selectedGame) {
      this._renderer.removeClass(selectedGame, 'selected');
    }
  }

  public onSelectUser(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      userId: selectEl.value,
    });
  }

  public generateUserSelectOption(user: IUserResponse): string {
    return JSON.stringify({
      icon: `<img class="shrink-0 size-5 rounded-md" src="${environment.API_URL}/uploads/${user.avatar}" alt="${user.firstName} ${user.lastName} avatar" />`,
    });
  }

  private resetSelectUser(): void {
    const userDataIcon = this._el.nativeElement.querySelector(
      'button[id="server-user-btn"] > [data-icon]'
    );
    const userDataTitle = this._el.nativeElement.querySelector(
      'button[id="server-user-btn"] > [data-title]'
    );
    const selectedUser = this._el.nativeElement.querySelector(
      'div.data-server-user > div.selected'
    );
    if (userDataIcon) {
      this._renderer.addClass(userDataIcon, 'hidden');
      this._renderer.setProperty(userDataIcon, 'innerHTML', 'null');
    }
    if (userDataTitle) {
      this._renderer.setProperty(
        userDataTitle,
        'innerHTML',
        'Select user for server...'
      );
    }
    if (selectedUser) {
      this._renderer.removeClass(selectedUser, 'selected');
    }
  }

  public onSelectMachine(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      machineId: selectEl.value,
    });
  }

  private resetSelectMachine(): void {
    const machineDataTitle = this._el.nativeElement.querySelector(
      'button[id="server-machine-btn"] > [data-title]'
    );
    const selectedMachine = this._el.nativeElement.querySelector(
      'div.data-server-machine > div.selected'
    );

    if (machineDataTitle) {
      this._renderer.setProperty(
        machineDataTitle,
        'innerHTML',
        'Select machine for server...'
      );
    }

    if (selectedMachine) {
      this._renderer.removeClass(selectedMachine, 'selected');
    }
  }

  public onSelectMod(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      modId: selectEl.value,
    });
  }

  private resetSelectMod(): void {
    const modDataTitle = this._el.nativeElement.querySelector(
      'button[id="server-mod-btn"] > [data-title]'
    );
    const selectedMod = this._el.nativeElement.querySelector(
      'div.data-server-mod > div.selected'
    );

    if (modDataTitle) {
      this._renderer.setProperty(
        modDataTitle,
        'innerHTML',
        'Select mod for server...'
      );
    }

    if (selectedMod) {
      this._renderer.removeClass(selectedMod, 'selected');
    }
  }

  public onSelectPlan(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      planId: selectEl.value,
    });
  }

  private resetSelectPlan(): void {
    const planDataTitle = this._el.nativeElement.querySelector(
      'button[id="server-plan-btn"] > [data-title]'
    );
    const selectedPlan = this._el.nativeElement.querySelector(
      'div.data-server-plan > div.selected'
    );

    if (planDataTitle) {
      this._renderer.setProperty(
        planDataTitle,
        'innerHTML',
        'Select plan for server...'
      );
    }

    if (selectedPlan) {
      this._renderer.removeClass(selectedPlan, 'selected');
    }
  }

  // public modAddFormHasErrors(): boolean {
  //   // Game ID Errors
  //   if (this.modAddForm.get('gameId')?.errors?.['required']) {
  //     this._toaster.error('The game ID field must not be empty.', 'Error');
  //     return true;
  //   }
  //   if (this.modAddForm.get('gameId')?.errors?.['invalidUuid']) {
  //     this._toaster.error('The game ID is not valid.', 'Error');
  //     return true;
  //   }
  //   // Mod Name Errors
  //   if (this.modAddForm.get('modName')?.errors?.['required']) {
  //     this._toaster.error('The mod name field must not be empty.', 'Error');
  //     return true;
  //   }
  //   if (this.modAddForm.get('modName')?.errors?.['minlength']) {
  //     this._toaster.error(
  //       'The mod name must contain at least 2 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.modAddForm.get('modName')?.errors?.['maxlength']) {
  //     this._toaster.error(
  //       'The mod name must contain a maximum of 40 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   // Docker Image Errors
  //   if (this.modAddForm.get('dockerImage')?.errors?.['required']) {
  //     this._toaster.error('The docker image field must not be empty.', 'Error');
  //     return true;
  //   }
  //   if (this.modAddForm.get('dockerImage')?.errors?.['minlength']) {
  //     this._toaster.error(
  //       'The docker image must contain at least 2 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.modAddForm.get('dockerImage')?.errors?.['maxlength']) {
  //     this._toaster.error(
  //       'The docker image must contain a maximum of 40 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.modAddForm.get('dockerImage')?.errors?.['pattern']) {
  //     this._toaster.error(
  //       'Allowed characters for the Docker image are: a-z (lowercase only), 0-9, - (hyphen), and _ (underscore).',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   // Description Errors
  //   if (this.modAddForm.get('description')?.errors?.['required']) {
  //     this._toaster.error('The description field must not be empty.', 'Error');
  //     return true;
  //   }
  //   if (this.modAddForm.get('description')?.errors?.['minlength']) {
  //     this._toaster.error(
  //       'The description must contain at least 10 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.modAddForm.get('description')?.errors?.['maxlength']) {
  //     this._toaster.error(
  //       'The description must contain a maximum of 2500 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   // Docker File Errors
  //   if (this.modAddForm.get('dockerFile')?.errors?.['required']) {
  //     this._toaster.error('The docker file field must not be empty.', 'Error');
  //     return true;
  //   }
  //   // Startup Command Errors
  //   if (this.modAddForm.get('startupCommand')?.errors?.['required']) {
  //     this._toaster.error('The show field must not be empty.', 'Error');
  //     return true;
  //   }
  //   // Startup Variables Errors
  //   if (this.modAddForm.get('startupVariables')?.errors?.['required']) {
  //     this._toaster.error('The editable field must not be empty.', 'Error');
  //     return true;
  //   }
  //   // Custom Errors
  //   const dockerFile = this.modAddForm.get('dockerFile')?.value as File;
  //   if (dockerFile.name !== 'Dockerfile.zip') {
  //     this._toaster.error('The file name must be Dockerfile.zip', 'Error');
  //     return true;
  //   }
  //   if (this.startupVariables.length < 1) {
  //     this._toaster.error(
  //       'You must select at least one startup variable.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   return false;
  // }
  // public onDeleteStartupVariable(name: string): void {
  //   const index = this.startupVariables.findIndex(
  //     (variable) => variable.name === name
  //   );
  //   if (index === -1) {
  //     this._toaster.error(
  //       'This startup variable does not exist, deletion aborted.',
  //       'Error'
  //     );
  //   }
  //   this.startupVariables.splice(index, 1);
  // }
}
