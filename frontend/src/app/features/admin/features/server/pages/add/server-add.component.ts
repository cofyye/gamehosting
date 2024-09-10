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
import { SELECT_MACHINES } from '../../../../shared/stores/machine/machine.selectors';
import { SELECT_GAMES } from '../../../../shared/stores/game/game.selectors';
import { SELECT_PLANS } from '../../../../shared/stores/plan/plan.selectors';
import { SELECT_MODS } from '../../../../shared/stores/mod/mod.selectors';
import { LOAD_GAMES_BY_MACHINE_ID } from '../../../../shared/stores/game/game.actions';
import { LOAD_MODS_BY_GAME_ID } from '../../../../shared/stores/mod/mod.actions';
import { LOAD_PLANS_BY_GAME_ID } from '../../../../shared/stores/plan/plan.actions';

@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html',
  styleUrl: './server-add.component.css',
})
export class ServerAddComponent implements OnInit, OnDestroy {
  private loadingServerAddSub!: Subscription;
  private serverAddSub!: Subscription;
  private getMachinesSub!: Subscription;
  private getGamesSub!: Subscription;
  private getModsSub!: Subscription;
  private getPlansSub!: Subscription;
  private routeSub!: Subscription;
  public isLoadingServerAdd: boolean = false;
  public games: IGameResponse[] = [];
  public mods: IModResponse[] = [];
  public plans: IPlanResponse[] = [];
  public users: IUserResponse[] = [];
  public machines: IMachineResponse[] = [];

  constructor(
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
    customPrice: new FormControl<number>(
      {
        value: 0,
        disabled: true,
      },
      [Validators.min(0), Validators.max(100000), unsignedNumericValidator()]
    ),
    expirationDate: new FormControl<Date>(moment.utc().toDate(), [
      Validators.required,
    ]),
  });

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.users = data['users'] as IUserResponse[];
      this.machines = data['machines'] as IMachineResponse[];
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

    this.getMachinesSub = this._store
      .select(SELECT_MACHINES)
      .subscribe((machines) => {
        this.machines = machines;
      });

    this.getGamesSub = this._store.select(SELECT_GAMES).subscribe((games) => {
      this.games = games;
    });

    this.getPlansSub = this._store.select(SELECT_PLANS).subscribe((plans) => {
      this.plans = plans;
    });

    this.getModsSub = this._store.select(SELECT_MODS).subscribe((mods) => {
      this.mods = mods;
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
    if (this.getMachinesSub) {
      this.getMachinesSub.unsubscribe();
    }
    if (this.getModsSub) {
      this.getModsSub.unsubscribe();
    }
    if (this.getPlansSub) {
      this.getPlansSub.unsubscribe();
    }
    if (this.getGamesSub) {
      this.getGamesSub.unsubscribe();
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
      userId: this.serverAddForm.get('userId')?.value,
      planId: this.serverAddForm.get('planId')?.value,
      name: this.serverAddForm.get('name')?.value,
      port: this.serverAddForm.get('port')?.value,
      expirationDate: this.serverAddForm.get('expirationDate')?.value,
      ...(!this.serverAddForm.get('customPrice')?.disabled
        ? { customPrice: this.serverAddForm.get('customPrice')?.value }
        : {}),
    };

    // this._store.dispatch(START_LOADING({ key: 'ADD_SERVER_BTN' }));
    // this._store.dispatch(ADD_MOD({ payload: data }));
  }

  public onResetServer(): void {
    this.serverAddForm.reset();
  }

  public onChangeCustomPrice(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.serverAddForm.get('customPrice')?.enable();
    } else {
      this.serverAddForm.get('customPrice')?.disable();
    }
  }

  public onSelectGame(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      gameId: selectEl.value,
    });

    if (selectEl.value !== '0') {
      this._store.dispatch(LOAD_MODS_BY_GAME_ID({ payload: selectEl.value }));
      this._store.dispatch(LOAD_PLANS_BY_GAME_ID({ payload: selectEl.value }));

      this.serverAddForm.patchValue({
        modId: '',
        planId: '',
      });
    }
  }

  public onSelectUser(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      userId: selectEl.value,
    });
  }

  public onSelectMachine(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      machineId: selectEl.value,
    });

    if (selectEl.value !== '0') {
      this._store.dispatch(
        LOAD_GAMES_BY_MACHINE_ID({ payload: selectEl.value })
      );

      this.plans = [];
      this.mods = [];

      this.serverAddForm.patchValue({
        modId: '',
        planId: '',
      });
    }
  }

  public onSelectMod(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      modId: selectEl.value,
    });
  }

  public onSelectPlan(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.serverAddForm.patchValue({
      planId: selectEl.value,
    });
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
