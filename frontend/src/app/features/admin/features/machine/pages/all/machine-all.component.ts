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
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import { AppState } from '../../../../../../app.state';
import { Store } from '@ngrx/store';
import { IS_LOADING } from '../../../../../../shared/stores/loader/loader.selectors';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { START_LOADING } from '../../../../../../shared/stores/loader/loader.actions';
import { IMachineResponse } from '../../../../shared/models/machine-response.model';
import {
  SELECT_MACHINES,
  SELECT_SELECTED_MACHINE,
} from '../../../../shared/stores/machine/machine.selectors';
import {
  DELETE_MACHINE,
  DESELECT_MACHINE,
  SELECT_MACHINE,
} from '../../../../shared/stores/machine/machine.actions';

@Component({
  selector: 'app-machine-all',
  templateUrl: './machine-all.component.html',
  styleUrl: './machine-all.component.css',
})
export class MachineAllComponent implements OnInit, OnDestroy {
  @ViewChild('deleteMachineAlertCloseButton')
  deleteMachineAlertCloseButton!: ElementRef<HTMLButtonElement>;

  private routeSub!: Subscription;
  private machineDeleteSub!: Subscription;
  private loadingMachineDeleteSub!: Subscription;
  private getMachinesSub!: Subscription;
  public machines: IMachineResponse[] = [];
  public environment = environment;
  public selectedMachine: IMachineResponse | null | undefined = null;
  public selectedMachineSub!: Subscription;
  public isLoadingMachineDelete: boolean = false;

  constructor(
    private readonly _toaster: ToasterService,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.machines = data['machines'];
    });

    this.loadingMachineDeleteSub = this._store
      .select(IS_LOADING('DELETE_MACHINE_BTN'))
      .subscribe((value) => (this.isLoadingMachineDelete = value));

    this.selectedMachineSub = this._store
      .select(SELECT_SELECTED_MACHINE)
      .subscribe((machine) => {
        this.selectedMachine = machine;
      });

    this.machineDeleteSub = this._store
      .select(SELECT_HTTP_RESPONSE('DELETE_MACHINE'))
      .subscribe((_) => {
        this.onDeselectMachine();
        if (this.deleteMachineAlertCloseButton) {
          this.deleteMachineAlertCloseButton.nativeElement.click();
        }
      });

    this.getMachinesSub = this._store
      .select(SELECT_MACHINES)
      .subscribe((machines) => {
        this.machines = machines;
      });
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.selectedMachineSub) {
      this.selectedMachineSub.unsubscribe();
    }
    if (this.loadingMachineDeleteSub) {
      this.loadingMachineDeleteSub.unsubscribe();
    }
    if (this.machineDeleteSub) {
      this.machineDeleteSub.unsubscribe();
    }
    if (this.getMachinesSub) {
      this.getMachinesSub.unsubscribe();
    }
  }

  public onSelectMachine(id: string): void {
    this._store.dispatch(SELECT_MACHINE({ id }));
  }

  public onDeselectMachine(): void {
    setTimeout(() => this._store.dispatch(DESELECT_MACHINE()), 100);
  }

  public onDeleteMachine(): void {
    const id = this.selectedMachine?.id;
    if (id) {
      this._store.dispatch(START_LOADING({ key: 'DELETE_MACHINE_BTN' }));
      // this._store.dispatch(DELETE_MACHINE({ payload: id }));
    } else {
      this._toaster.error(
        'No machine selected, deletion has been aborted.',
        'Error'
      );
      this.onDeselectMachine();
      if (this.deleteMachineAlertCloseButton) {
        this.deleteMachineAlertCloseButton.nativeElement.click();
      }
    }
  }
}
