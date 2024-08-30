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
import { ISelectedGame } from '../../../../../../shared/models/game.model';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { uuidValidator } from '../../../../../../shared/validators/uuid.validator';
import { isIntValidator } from '../../../../../../shared/validators/integer.validator';
import { numericValidator } from '../../../../../../shared/validators/numeric.validator';
import { ActivatedRoute } from '@angular/router';
import { IPlanAddRequest } from '../../../../shared/models/plan-request.model';
import { IGameResponse } from '../../../../shared/models/game-response.model';

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

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public planAddForm: FormGroup = this._fb.group({
    gameId: new FormControl<string>('', [Validators.required, uuidValidator()]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40),
    ]),
    slot: new FormControl<number>(10, [
      Validators.min(1),
      Validators.max(65535),
      isIntValidator(),
    ]),
    ram: new FormControl<number>(536870912, [
      Validators.min(536870912), // 512 MB in bytes
      Validators.max(109951162777600), // 10 TB in bytes
      isIntValidator(),
    ]),
    cpuCount: new FormControl<number>(1, [
      Validators.min(1),
      Validators.max(65535),
      isIntValidator(),
    ]),
    price: new FormControl<number>(0.0, [
      Validators.required,
      Validators.max(100000),
      numericValidator(),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(2500),
    ]),
    machines: new FormControl<string>('', [Validators.required]),
  });

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.games = data['games'] as IGameResponse[];
    });

    this.loadingPlanAddSub = this._store
      .select(IS_LOADING('ADD_PLAN_BTN'))
      .subscribe((value) => (this.isLoadingPlanAdd = value));

    this.planAddSub = this._store
      .select(SELECT_HTTP_RESPONSE('ADD_PLAN'))
      .subscribe((response) => {
        if (response?.success) {
          // this.onResetMachine();
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
    // if (this.machineAddFormHasErrors()) {
    //   return;
    // }

    const data: IPlanAddRequest = {
      gameId: this.planAddForm.get('locationId')?.value,
      name: this.planAddForm.get('name')?.value,
      slot: this.planAddForm.get('slot')?.value,
      ram: this.planAddForm.get('ram')?.value,
      cpuCount: this.planAddForm.get('cpuCount')?.value,
      price: this.planAddForm.get('price')?.value,
      description: this.planAddForm.get('description')?.value,
      machines: this.planAddForm.get('machines')?.value,
    };

    // this._store.dispatch(START_LOADING({ key: 'ADD_PLAN_BTN' }));
    // this._store.dispatch(ADD_PLAN({ payload: data }));
  }

  public onResetPlan(): void {
    this.resetSelectGame();
    this.planAddForm.reset();
    this.planAddForm.patchValue({
      slot: 10,
      ram: 536870912,
      cpuCount: 1,
      price: 0.0,
    });
  }

  public onSelectGame(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    this.planAddForm.patchValue({
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
  }
}
