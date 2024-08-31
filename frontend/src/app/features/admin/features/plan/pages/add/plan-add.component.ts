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
import { HostBy } from '../../../../../../shared/enums/game.enum';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { uuidValidator } from '../../../../../../shared/validators/uuid.validator';
import { isIntValidator } from '../../../../../../shared/validators/integer.validator';
import { numericValidator } from '../../../../../../shared/validators/numeric.validator';
import { ActivatedRoute } from '@angular/router';
import { IPlanAddRequest } from '../../../../shared/models/plan-request.model';
import { IGameResponse } from '../../../../shared/models/game-response.model';
import { ADD_PLAN } from '../../../../shared/stores/plan/plan.actions';
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import {
  IMachinePlan,
  IMachinePlanRequest,
} from '../../../../../../shared/models/plan.model';
import { IMachineResponse } from '../../../../shared/models/machine-response.model';

@Component({
  selector: 'app-plan-add',
  templateUrl: './plan-add.component.html',
  styleUrl: './plan-add.component.css',
})
export class PlanAddComponent implements OnInit, OnDestroy {
  private loadingPlanAddSub!: Subscription;
  private planAddSub!: Subscription;
  private routeSub!: Subscription;
  public isLoadingPlanAdd: boolean = false;
  public games: IGameResponse[] = [];
  public machines: IMachineResponse[] = [];
  public selectedGame: IGameResponse | null = null;
  public hostBy = HostBy;
  public machinesPlans: IMachinePlan[] = [];
  public machinesPlansRequest: IMachinePlanRequest[] = [];

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _toaster: ToasterService,
    private readonly _store: Store<AppState>
  ) {}

  public planAddForm: FormGroup = this._fb.group({
    gameId: new FormControl<string>('', [Validators.required, uuidValidator()]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
    ]),
    slot: new FormControl<string>('', [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
      isIntValidator(),
    ]),
    ram: new FormControl<string>('', [
      Validators.required,
      Validators.min(536870912), // 512 MB in bytes
      Validators.max(109951162777600), // 10 TB in bytes
      isIntValidator(),
    ]),
    cpuCount: new FormControl<number>(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
      isIntValidator(),
    ]),
    price: new FormControl<string>('', [
      Validators.required,
      Validators.max(100000),
      numericValidator('price'),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(2500),
    ]),
    machines: new FormControl<string>('', [Validators.required]),
    addMachinePlan: this._fb.group({
      machineId: new FormControl<string>('', [
        Validators.required,
        uuidValidator(),
      ]),
      machineName: new FormControl<string>('', [Validators.required]),
      maxServers: new FormControl<string>('', [
        Validators.required,
        Validators.min(1),
        Validators.max(65535),
        isIntValidator(),
      ]),
    }),
  });

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.games = data['data']?.games as IGameResponse[];
      this.machines = data['data']?.machines as IMachineResponse[];
    });

    this.loadingPlanAddSub = this._store
      .select(IS_LOADING('ADD_PLAN_BTN'))
      .subscribe((value) => (this.isLoadingPlanAdd = value));

    this.planAddSub = this._store
      .select(SELECT_HTTP_RESPONSE('ADD_PLAN'))
      .subscribe((response) => {
        if (response?.success) {
          this.onResetPlan();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.loadingPlanAddSub) {
      this.loadingPlanAddSub.unsubscribe();
    }
    if (this.planAddSub) {
      this.planAddSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  public onAddPlan(): void {
    this.planAddForm.patchValue({
      machines: JSON.stringify(this.machinesPlansRequest),
    });

    if (this.planAddFormHasErrors()) {
      return;
    }

    const data: IPlanAddRequest = {
      gameId: this.planAddForm.get('gameId')?.value,
      name: this.planAddForm.get('name')?.value,
      price: this.planAddForm.get('price')?.value,
      description: this.planAddForm.get('description')?.value,
      machines: this.planAddForm.get('machines')?.value,
      ...(this.selectedGame?.hostBy === HostBy.SLOT
        ? { slot: this.planAddForm.get('slot')?.value }
        : {}),
      ...(this.selectedGame?.hostBy === HostBy.CUSTOM_RESOURCES
        ? {
            ram: this.planAddForm.get('ram')?.value,
            cpuCount: this.planAddForm.get('cpuCount')?.value,
          }
        : {}),
    };

    this._store.dispatch(START_LOADING({ key: 'ADD_PLAN_BTN' }));
    this._store.dispatch(ADD_PLAN({ payload: data }));
  }

  public onResetPlan(): void {
    this.resetSelectGame();
    this.resetMachinePlan();
    this.planAddForm.reset();
    this.planAddForm.patchValue({
      cpuCount: 1,
    });
    this.selectedGame = null;
    this.machinesPlans = [];
    this.machinesPlansRequest = [];
  }

  public onSelectGame(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.selectedGame =
      this.games.find((game) => game.id == selectEl.value) ?? null;

    this.planAddForm.patchValue({
      gameId: selectEl.value,
    });
  }

  public onSelectMachine(event: Event) {
    const selectEl = event.target as HTMLSelectElement;

    this.planAddForm.patchValue({
      addMachinePlan: {
        machineId: selectEl.value,
        machineName: this._el.nativeElement
          .querySelector(`option[id='${selectEl.value}'`)
          ?.textContent?.trim(),
      },
    });
  }

  public generateGameSelectOption(game: IGameResponse): string {
    return JSON.stringify({
      icon: `<img class="shrink-0 size-5 rounded-md" src="${environment.API_URL}/assets/games/${game.tag}.png" alt="${game.name}" />`,
    });
  }

  private resetSelectGame(): void {
    const gameDataIcon = this._el.nativeElement.querySelector(
      'button[id="game-plan-btn"] > [data-icon]'
    );
    const gameDataTitle = this._el.nativeElement.querySelector(
      'button[id="game-plan-btn"] > [data-title]'
    );
    const selectedGame = this._el.nativeElement.querySelector(
      'div.data-game-plan > div.selected'
    );

    if (gameDataIcon) {
      this._renderer.addClass(gameDataIcon, 'hidden');
      this._renderer.setProperty(gameDataIcon, 'innerHTML', 'null');
    }
    if (gameDataTitle) {
      this._renderer.setProperty(
        gameDataTitle,
        'innerHTML',
        'Select game plan...'
      );
    }
    if (selectedGame) {
      this._renderer.removeClass(selectedGame, 'selected');
    }

    this.selectedGame = null;
  }

  private resetMachinePlan(): void {
    const machinePlanDataTitle = this._el.nativeElement.querySelector(
      'button[id="machine-plan-btn"] > [data-title]'
    );
    const selectedMachine = this._el.nativeElement.querySelector(
      'div.data-machine-plan > div.selected'
    );

    if (machinePlanDataTitle) {
      this._renderer.setProperty(
        machinePlanDataTitle,
        'innerHTML',
        'Select machine for plan...'
      );
    }

    if (selectedMachine) {
      this._renderer.removeClass(selectedMachine, 'selected');
    }

    this.planAddForm.get('addMachinePlan')?.reset();
  }

  public addMachinePlan(): void {
    if (this.addMachinePlanHasErrors()) {
      return;
    }

    this.machinesPlans.push(this.planAddForm.get('addMachinePlan')?.value);
    this.machinesPlansRequest.push({
      id: this.planAddForm.get('addMachinePlan.machineId')?.value,
      server_count: this.planAddForm.get('addMachinePlan.maxServers')?.value,
    });
    this.resetMachinePlan();
  }

  private addMachinePlanHasErrors(): boolean {
    // MachineId Errors
    if (
      this.planAddForm.get('addMachinePlan.machineId')?.errors?.['required']
    ) {
      this._toaster.error(
        'You must select a machine and enter the maximum number of servers for this plan.',
        'Error'
      );
      return true;
    }

    if (
      this.planAddForm.get('addMachinePlan.machineId')?.errors?.['invalidUuid']
    ) {
      this._toaster.error('The machine ID is not valid.', 'Error');
      return true;
    }

    // Name Errors
    if (
      this.planAddForm.get('addMachinePlan.machineName')?.errors?.['required']
    ) {
      this._toaster.error('The machine name field must not be empty.', 'Error');
      return true;
    }

    // MaxServers Errors
    if (
      this.planAddForm.get('addMachinePlan.maxServers')?.errors?.['required']
    ) {
      this._toaster.error(
        'The machine max servers field must not be empty.',
        'Error'
      );
      return true;
    }
    if (this.planAddForm.get('addMachinePlan.maxServers')?.errors?.['min']) {
      this._toaster.error(
        'The minimum value for the max servers must be 1.',
        'Error'
      );
      return true;
    }
    if (this.planAddForm.get('addMachinePlan.maxServers')?.errors?.['max']) {
      this._toaster.error(
        'The maximum value for the max servers must be 65535.',
        'Error'
      );
      return true;
    }
    if (
      this.planAddForm.get('addMachinePlan.maxServers')?.errors?.['notInteger']
    ) {
      this._toaster.error(
        'The max servers must be in numeric format.',
        'Error'
      );
      return true;
    }

    // Custom Errors
    if (
      this.machinesPlans.findIndex(
        (mp) =>
          mp.machineId ===
          this.planAddForm.get('addMachinePlan.machineId')?.value
      ) !== -1
    ) {
      this._toaster.error('You have already selected this machine.', 'Error');
      return true;
    }

    return false;
  }

  private planAddFormHasErrors(): boolean {
    // GameId Errors
    if (this.planAddForm.get('gameId')?.errors?.['required']) {
      this._toaster.error('The game ID field must not be empty.', 'Error');
      return true;
    }

    if (this.planAddForm.get('gameId')?.errors?.['invalidUuid']) {
      this._toaster.error('The game ID is not valid.', 'Error');
      return true;
    }

    // Name Errors
    if (this.planAddForm.get('name')?.errors?.['required']) {
      this._toaster.error('The name field must not be empty.', 'Error');
      return true;
    }
    if (this.planAddForm.get('name')?.errors?.['minlength']) {
      this._toaster.error(
        'The name must contain at least 2 characters.',
        'Error'
      );
      return true;
    }
    if (this.planAddForm.get('name')?.errors?.['maxlength']) {
      this._toaster.error(
        'The name must contain a maximum of 40 characters.',
        'Error'
      );
      return true;
    }

    // Slot Errors
    if (this.selectedGame?.hostBy === HostBy.SLOT) {
      if (this.planAddForm.get('slot')?.errors?.['required']) {
        this._toaster.error('The slot field must not be empty.', 'Error');
        return true;
      }
      if (this.planAddForm.get('slot')?.errors?.['notInteger']) {
        this._toaster.error('The slot must be in numeric format.', 'Error');
        return true;
      }
      if (this.planAddForm.get('slot')?.errors?.['min']) {
        this._toaster.error(
          'The minimum value for the slot must be 1.',
          'Error'
        );
        return true;
      }
      if (this.planAddForm.get('slot')?.errors?.['max']) {
        this._toaster.error(
          'The maximum value for the slot must be 65535.',
          'Error'
        );
        return true;
      }
    }

    if (this.selectedGame?.hostBy === HostBy.CUSTOM_RESOURCES) {
      // Ram Errors
      if (this.planAddForm.get('ram')?.errors?.['required']) {
        this._toaster.error('The ram field must not be empty.', 'Error');
        return true;
      }
      if (this.planAddForm.get('ram')?.errors?.['notInteger']) {
        this._toaster.error('The ram must be in numeric format.', 'Error');
        return true;
      }
      if (this.planAddForm.get('ram')?.errors?.['min']) {
        this._toaster.error(
          'The minimum value for the ram must be 512 MB in bytes.',
          'Error'
        );
        return true;
      }
      if (this.planAddForm.get('ram')?.errors?.['max']) {
        this._toaster.error(
          'The maximum value for the ram must be 10 TB in bytes.',
          'Error'
        );
        return true;
      }

      // CPUs Count Errors
      if (this.planAddForm.get('cpuCount')?.errors?.['required']) {
        this._toaster.error('The CPU count field must not be empty.', 'Error');
        return true;
      }
      if (this.planAddForm.get('cpuCount')?.errors?.['notInteger']) {
        this._toaster.error(
          'The CPU count must be in numeric format.',
          'Error'
        );
        return true;
      }
      if (this.planAddForm.get('cpuCount')?.errors?.['min']) {
        this._toaster.error(
          'The minimum value for the CPU count must be 1.',
          'Error'
        );
        return true;
      }
      if (this.planAddForm.get('cpuCount')?.errors?.['max']) {
        this._toaster.error(
          'The maximum value for the CPU count must be 65535.',
          'Error'
        );
        return true;
      }
    }

    // Price Errors
    if (this.planAddForm.get('price')?.errors?.['required']) {
      this._toaster.error('The price field must not be empty.', 'Error');
      return true;
    }
    if (this.planAddForm.get('price')?.errors?.['max']) {
      this._toaster.error(
        'The maximum value for the price must be 100000.',
        'Error'
      );
      return true;
    }
    if (this.planAddForm.get('price')?.errors?.['numeric']) {
      this._toaster.error(
        this.planAddForm.get('price')?.errors?.['numeric'],
        'Error'
      );
      return true;
    }

    // Description Errors
    if (this.planAddForm.get('description')?.errors?.['required']) {
      this._toaster.error('The description field must not be empty.', 'Error');
      return true;
    }
    if (this.planAddForm.get('description')?.errors?.['minlength']) {
      this._toaster.error(
        'The description must contain at least 10 characters.',
        'Error'
      );
      return true;
    }
    if (this.planAddForm.get('description')?.errors?.['maxlength']) {
      this._toaster.error(
        'The description must contain a maximum of 2500 characters.',
        'Error'
      );
      return true;
    }

    // Machines Errors
    if (this.planAddForm.get('machines')?.errors?.['required']) {
      this._toaster.error(
        'You must select a machine and enter the maximum number of servers for this plan.',
        'Error'
      );
      return true;
    }

    // Custom Errors
    try {
      const machines: unknown[] = JSON.parse(
        this.planAddForm.get('machines')?.value
      );

      if (!machines.length) {
        this._toaster.error(
          'You must select a machine and enter the maximum number of servers for this plan.',
          'Error'
        );
        return true;
      }

      if (!Array.isArray(machines)) {
        this._toaster.error(
          'You must select a machine and enter the maximum number of servers for this plan.',
          'Error'
        );
        return true;
      }
    } catch (err: unknown) {
      this._toaster.error(
        'You must select a machine and enter the maximum number of servers for this plan.',
        'Error'
      );
      return true;
    }

    return false;
  }
}
