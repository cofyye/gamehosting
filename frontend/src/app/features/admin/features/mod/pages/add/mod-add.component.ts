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
import { isUnsignedIntValidator } from '../../../../../../shared/validators/unsigned-integer.validator';
import { unsignedNumericValidator } from '../../../../../../shared/validators/unsigned-numeric.validator';
import { ActivatedRoute } from '@angular/router';
import { IGameResponse } from '../../../../shared/models/game-response.model';
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import {
  DOCKER_IMAGE_REGEX,
  STARTUP_DOCKER_ENVIRONMENT_NAME_REGEX,
} from '../../../../../../shared/utils/regex.constants';
import { IStartupVariable } from '../../../../../../shared/models/mod.model';
import { IModAddRequest } from '../../../../shared/models/mod-request.model';
import { ADD_MOD } from '../../../../shared/stores/mod/mod.actions';

@Component({
  selector: 'app-mod-add',
  templateUrl: './mod-add.component.html',
  styleUrl: './mod-add.component.css',
})
export class ModAddComponent implements OnInit, OnDestroy {
  private loadingModAddSub!: Subscription;
  private modAddSub!: Subscription;
  private routeSub!: Subscription;
  public isLoadingModAdd: boolean = false;
  public games: IGameResponse[] = [];
  public startupVariables: IStartupVariable[] = [];
  public dockerFile: string | null = null;

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _toaster: ToasterService,
    private readonly _store: Store<AppState>
  ) {}

  public modAddForm: FormGroup = this._fb.group({
    gameId: new FormControl<string>('', [Validators.required, uuidValidator()]),
    modName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
    ]),
    dockerImage: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
      Validators.pattern(DOCKER_IMAGE_REGEX),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(2500),
    ]),
    dockerFile: new FormControl<File | null>(null, []),
    startupCommand: new FormControl<string>('', [Validators.required]),
    startupVariables: new FormControl<string>('', [Validators.required]),
  });

  public addStartupVariableForm: FormGroup = this._fb.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    value: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    defaultValue: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    dockerEnvironment: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern(STARTUP_DOCKER_ENVIRONMENT_NAME_REGEX),
    ]),
    show: new FormControl<boolean>(true, [Validators.required]),
    editable: new FormControl<boolean>(true, [Validators.required]),
  });

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.games = data['games'] as IGameResponse[];
    });

    this.loadingModAddSub = this._store
      .select(IS_LOADING('ADD_MOD_BTN'))
      .subscribe((value) => (this.isLoadingModAdd = value));

    this.modAddSub = this._store
      .select(SELECT_HTTP_RESPONSE('ADD_MOD'))
      .subscribe((response) => {
        if (response?.success) {
          this.onResetMod();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.loadingModAddSub) {
      this.loadingModAddSub.unsubscribe();
    }
    if (this.modAddSub) {
      this.modAddSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  onDockerFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.dockerFile = file.name;
      this.modAddForm.patchValue({
        dockerFile: file,
      });
    } else {
      this.dockerFile = null;
      this.modAddForm.patchValue({
        dockerFile: null,
      });
    }
  }

  public onAddMod(): void {
    // this.planAddForm.patchValue({
    //   machines: JSON.stringify(this.machinesPlansRequest),
    // });
    // if (this.planAddFormHasErrors()) {
    //   return;
    // }

    this.modAddForm.patchValue({
      startupVariables: JSON.stringify(this.startupVariables),
    });

    const data: IModAddRequest = {
      gameId: this.modAddForm.get('gameId')?.value,
      modName: this.modAddForm.get('modName')?.value,
      dockerImage: this.modAddForm.get('dockerImage')?.value,
      description: this.modAddForm.get('description')?.value,
      dockerFile: this.modAddForm.get('dockerFile')?.value,
      startupCommand: this.modAddForm.get('startupCommand')?.value,
      startupVariables: this.modAddForm.get('startupVariables')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'ADD_MOD_BTN' }));
    this._store.dispatch(ADD_MOD({ payload: data }));
  }

  public onResetMod(): void {
    this.resetSelectGame();
    this.modAddForm.reset();
    this.addStartupVariableForm.reset();
    this.addStartupVariableForm.patchValue({
      show: 'true',
      editable: 'true',
    });
    this.startupVariables = [];
  }

  public onSelectGame(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.modAddForm.patchValue({
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
      'button[id="mod-game-btn"] > [data-icon]'
    );
    const gameDataTitle = this._el.nativeElement.querySelector(
      'button[id="mod-game-btn"] > [data-title]'
    );
    const selectedGame = this._el.nativeElement.querySelector(
      'div.data-mod-game > div.selected'
    );
    if (gameDataIcon) {
      this._renderer.addClass(gameDataIcon, 'hidden');
      this._renderer.setProperty(gameDataIcon, 'innerHTML', 'null');
    }
    if (gameDataTitle) {
      this._renderer.setProperty(
        gameDataTitle,
        'innerHTML',
        'Select game for mod...'
      );
    }
    if (selectedGame) {
      this._renderer.removeClass(selectedGame, 'selected');
    }
  }

  public onAddStartupVariable(): void {
    const data: IStartupVariable = {
      name: this.addStartupVariableForm.get('name')?.value,
      value: this.addStartupVariableForm.get('value')?.value,
      defaultValue: this.addStartupVariableForm.get('defaultValue')?.value,
      dockerEnvironment:
        this.addStartupVariableForm.get('dockerEnvironment')?.value,
      show: this.addStartupVariableForm.get('show')?.value,
      editable: this.addStartupVariableForm.get('editable')?.value,
    };

    this.startupVariables.push(data);
  }

  public onDeleteStartupVariable(name: string): void {
    const index = this.startupVariables.findIndex(
      (variable) => variable.name === name
    );

    if (index === -1) {
      this._toaster.error(
        'This startup variable does not exist, deletion aborted.',
        'Error'
      );
    }

    this.startupVariables.splice(index, 1);
  }

  // private resetMachinePlan(): void {
  //   const machinePlanDataTitle = this._el.nativeElement.querySelector(
  //     'button[id="machine-plan-btn"] > [data-title]'
  //   );
  //   const selectedMachine = this._el.nativeElement.querySelector(
  //     'div.data-machine-plan > div.selected'
  //   );
  //   if (machinePlanDataTitle) {
  //     this._renderer.setProperty(
  //       machinePlanDataTitle,
  //       'innerHTML',
  //       'Select machine for plan...'
  //     );
  //   }
  //   if (selectedMachine) {
  //     this._renderer.removeClass(selectedMachine, 'selected');
  //   }
  //   this.planAddForm.get('addMachinePlan')?.reset();
  // }
  // public addMachinePlan(): void {
  //   if (this.addMachinePlanHasErrors()) {
  //     return;
  //   }
  //   this.machinesPlans.push(this.planAddForm.get('addMachinePlan')?.value);
  //   this.machinesPlansRequest.push({
  //     id: this.planAddForm.get('addMachinePlan.machineId')?.value,
  //     maxServers: this.planAddForm.get('addMachinePlan.maxServers')?.value,
  //   });
  //   this.resetMachinePlan();
  // }
  // private addMachinePlanHasErrors(): boolean {
  //   // MachineId Errors
  //   if (
  //     this.planAddForm.get('addMachinePlan.machineId')?.errors?.['required']
  //   ) {
  //     this._toaster.error(
  //       'You must select a machine and enter the maximum number of servers for this plan.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (
  //     this.planAddForm.get('addMachinePlan.machineId')?.errors?.['invalidUuid']
  //   ) {
  //     this._toaster.error('The machine ID is not valid.', 'Error');
  //     return true;
  //   }
  //   // Name Errors
  //   if (
  //     this.planAddForm.get('addMachinePlan.machineName')?.errors?.['required']
  //   ) {
  //     this._toaster.error('The machine name field must not be empty.', 'Error');
  //     return true;
  //   }
  //   // MaxServers Errors
  //   if (
  //     this.planAddForm.get('addMachinePlan.maxServers')?.errors?.['required']
  //   ) {
  //     this._toaster.error(
  //       'The machine maximum servers field must not be empty.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.planAddForm.get('addMachinePlan.maxServers')?.errors?.['min']) {
  //     this._toaster.error(
  //       'The minimum value for the maximum servers must be 1.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.planAddForm.get('addMachinePlan.maxServers')?.errors?.['max']) {
  //     this._toaster.error(
  //       'The maximum value for the maximum servers must be 65535.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (
  //     this.planAddForm.get('addMachinePlan.maxServers')?.errors?.[
  //       'notUnsignedInteger'
  //     ]
  //   ) {
  //     this._toaster.error(
  //       'The maximum servers must be in numeric format.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   // Custom Errors
  //   if (
  //     this.machinesPlans.findIndex(
  //       (mp) =>
  //         mp.machineId ===
  //         this.planAddForm.get('addMachinePlan.machineId')?.value
  //     ) !== -1
  //   ) {
  //     this._toaster.error('You have already selected this machine.', 'Error');
  //     return true;
  //   }
  //   return false;
  // }
  // private planAddFormHasErrors(): boolean {
  //   // GameId Errors
  //   if (this.planAddForm.get('gameId')?.errors?.['required']) {
  //     this._toaster.error('The game ID field must not be empty.', 'Error');
  //     return true;
  //   }
  //   if (this.planAddForm.get('gameId')?.errors?.['invalidUuid']) {
  //     this._toaster.error('The game ID is not valid.', 'Error');
  //     return true;
  //   }
  //   // Name Errors
  //   if (this.planAddForm.get('name')?.errors?.['required']) {
  //     this._toaster.error('The name field must not be empty.', 'Error');
  //     return true;
  //   }
  //   if (this.planAddForm.get('name')?.errors?.['minlength']) {
  //     this._toaster.error(
  //       'The name must contain at least 2 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.planAddForm.get('name')?.errors?.['maxlength']) {
  //     this._toaster.error(
  //       'The name must contain a maximum of 40 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   // Slot Errors
  //   if (this.selectedGame?.hostBy === HostBy.SLOT) {
  //     if (this.planAddForm.get('slot')?.errors?.['required']) {
  //       this._toaster.error('The slot field must not be empty.', 'Error');
  //       return true;
  //     }
  //     if (this.planAddForm.get('slot')?.errors?.['notUnsignedInteger']) {
  //       this._toaster.error('The slot must be in numeric format.', 'Error');
  //       return true;
  //     }
  //     if (this.planAddForm.get('slot')?.errors?.['min']) {
  //       this._toaster.error(
  //         'The minimum value for the slot must be 1.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //     if (this.planAddForm.get('slot')?.errors?.['max']) {
  //       this._toaster.error(
  //         'The maximum value for the slot must be 65535.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //   }
  //   if (this.selectedGame?.hostBy === HostBy.CUSTOM_RESOURCES) {
  //     // Ram Errors
  //     if (this.planAddForm.get('ram')?.errors?.['required']) {
  //       this._toaster.error('The ram field must not be empty.', 'Error');
  //       return true;
  //     }
  //     if (this.planAddForm.get('ram')?.errors?.['notUnsignedInteger']) {
  //       this._toaster.error('The ram must be in numeric format.', 'Error');
  //       return true;
  //     }
  //     if (this.planAddForm.get('ram')?.errors?.['min']) {
  //       this._toaster.error(
  //         'The minimum value for the ram must be 512 MB in bytes.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //     if (this.planAddForm.get('ram')?.errors?.['max']) {
  //       this._toaster.error(
  //         'The maximum value for the ram must be 10 TB in bytes.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //     // CPUs Count Errors
  //     if (this.planAddForm.get('cpuCount')?.errors?.['required']) {
  //       this._toaster.error('The CPU count field must not be empty.', 'Error');
  //       return true;
  //     }
  //     if (this.planAddForm.get('cpuCount')?.errors?.['notUnsignedInteger']) {
  //       this._toaster.error(
  //         'The CPU count must be in numeric format.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //     if (this.planAddForm.get('cpuCount')?.errors?.['min']) {
  //       this._toaster.error(
  //         'The minimum value for the CPU count must be 1.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //     if (this.planAddForm.get('cpuCount')?.errors?.['max']) {
  //       this._toaster.error(
  //         'The maximum value for the CPU count must be 65535.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //   }
  //   // Price Errors
  //   if (this.planAddForm.get('price')?.errors?.['required']) {
  //     this._toaster.error('The price field must not be empty.', 'Error');
  //     return true;
  //   }
  //   if (this.planAddForm.get('price')?.errors?.['max']) {
  //     this._toaster.error(
  //       'The maximum value for the price must be 100000.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.planAddForm.get('price')?.errors?.['notUnsignedNumeric']) {
  //     this._toaster.error(
  //       `The price must be a non-negative number with a maximum of 2 decimal places.`,
  //       'Error'
  //     );
  //     return true;
  //   }
  //   // Description Errors
  //   if (this.planAddForm.get('description')?.errors?.['required']) {
  //     this._toaster.error('The description field must not be empty.', 'Error');
  //     return true;
  //   }
  //   if (this.planAddForm.get('description')?.errors?.['minlength']) {
  //     this._toaster.error(
  //       'The description must contain at least 10 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   if (this.planAddForm.get('description')?.errors?.['maxlength']) {
  //     this._toaster.error(
  //       'The description must contain a maximum of 2500 characters.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   // Machines Errors
  //   if (this.planAddForm.get('machines')?.errors?.['required']) {
  //     this._toaster.error(
  //       'You must select a machine and enter the maximum number of servers for this plan.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   // Custom Errors
  //   try {
  //     const machines: unknown[] = JSON.parse(
  //       this.planAddForm.get('machines')?.value
  //     );
  //     if (!machines.length) {
  //       this._toaster.error(
  //         'You must select a machine and enter the maximum number of servers for this plan.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //     if (!Array.isArray(machines)) {
  //       this._toaster.error(
  //         'You must select a machine and enter the maximum number of servers for this plan.',
  //         'Error'
  //       );
  //       return true;
  //     }
  //   } catch (err: unknown) {
  //     this._toaster.error(
  //       'You must select a machine and enter the maximum number of servers for this plan.',
  //       'Error'
  //     );
  //     return true;
  //   }
  //   return false;
  // }
}
