import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { IPlanResponse } from '../../../../shared/models/plan-response.model';
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app.state';
import {
  SELECT_PLANS,
  SELECT_SELECTED_PLAN,
} from '../../../../shared/stores/plan/plan.selectors';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { IS_LOADING } from '../../../../../../shared/stores/loader/loader.selectors';
import {
  DELETE_PLAN,
  DESELECT_PLAN,
  SELECT_PLAN,
} from '../../../../shared/stores/plan/plan.actions';
import { START_LOADING } from '../../../../../../shared/stores/loader/loader.actions';

@Component({
  selector: 'app-plan-all',
  templateUrl: './plan-all.component.html',
  styleUrl: './plan-all.component.css',
})
export class PlanAllComponent implements OnInit, OnDestroy {
  @ViewChild('deletePlanAlertCloseButton')
  deletePlanAlertCloseButton!: ElementRef<HTMLButtonElement>;

  private routeSub!: Subscription;
  private planDeleteSub!: Subscription;
  private loadingPlanDeleteSub!: Subscription;
  private getPlansSub!: Subscription;
  public plans: IPlanResponse[] = [];
  public environment = environment;
  public selectedPlan: IPlanResponse | null | undefined = null;
  public selectedPlanSub!: Subscription;
  public isLoadingPlanDelete: boolean = false;

  constructor(
    private readonly _toaster: ToasterService,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.plans = data['plans'] as IPlanResponse[];
    });

    this.loadingPlanDeleteSub = this._store
      .select(IS_LOADING('DELETE_PLAN_BTN'))
      .subscribe((value) => (this.isLoadingPlanDelete = value));

    this.selectedPlanSub = this._store
      .select(SELECT_SELECTED_PLAN)
      .subscribe((plan) => {
        this.selectedPlan = plan;
      });

    this.planDeleteSub = this._store
      .select(SELECT_HTTP_RESPONSE('DELETE_PLAN'))
      .subscribe((_) => {
        this.onDeselectPlan();
        if (this.deletePlanAlertCloseButton) {
          this.deletePlanAlertCloseButton.nativeElement.click();
        }
      });

    this.getPlansSub = this._store.select(SELECT_PLANS).subscribe((plans) => {
      this.plans = plans;
    });
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.selectedPlanSub) {
      this.selectedPlanSub.unsubscribe();
    }
    if (this.loadingPlanDeleteSub) {
      this.loadingPlanDeleteSub.unsubscribe();
    }
    if (this.planDeleteSub) {
      this.planDeleteSub.unsubscribe();
    }
    if (this.getPlansSub) {
      this.getPlansSub.unsubscribe();
    }
  }

  public onSelectPlan(id: string): void {
    this._store.dispatch(SELECT_PLAN({ id }));
  }

  public onDeselectPlan(): void {
    setTimeout(() => this._store.dispatch(DESELECT_PLAN()), 100);
  }

  public onDeletePlan(): void {
    const id = this.selectedPlan?.id;
    if (id) {
      this._store.dispatch(START_LOADING({ key: 'DELETE_PLAN_BTN' }));
      this._store.dispatch(DELETE_PLAN({ payload: id }));
    } else {
      this._toaster.error(
        'No plan selected, deletion has been aborted.',
        'Error'
      );
      this.onDeselectPlan();
      if (this.deletePlanAlertCloseButton) {
        this.deletePlanAlertCloseButton.nativeElement.click();
      }
    }
  }
}
