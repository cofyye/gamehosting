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
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app.state';
import { START_LOADING } from '../../../../../../shared/stores/loader/loader.actions';
import { IModResponse } from '../../../../shared/models/mod-response.model';
import {
  SELECT_MODS,
  SELECT_SELECTED_MOD,
} from '../../../../shared/stores/mod/mod.selectors';
import {
  DELETE_MOD,
  DESELECT_MOD,
  SELECT_MOD,
} from '../../../../shared/stores/mod/mod.actions';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { IS_LOADING } from '../../../../../../shared/stores/loader/loader.selectors';

@Component({
  selector: 'app-mod-all',
  templateUrl: './mod-all.component.html',
  styleUrl: './mod-all.component.css',
})
export class ModAllComponent implements OnInit, OnDestroy {
  @ViewChild('deleteModAlertCloseButton')
  deleteModAlertCloseButton!: ElementRef<HTMLButtonElement>;

  private routeSub!: Subscription;
  private modDeleteSub!: Subscription;
  private loadingModDeleteSub!: Subscription;
  private getModsSub!: Subscription;
  public mods: IModResponse[] = [];
  public environment = environment;
  public selectedMod: IModResponse | null | undefined = null;
  public selectedModSub!: Subscription;
  public isLoadingModDelete: boolean = false;

  constructor(
    private readonly _toaster: ToasterService,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.mods = data['mods'];
    });

    this.loadingModDeleteSub = this._store
      .select(IS_LOADING('DELETE_MOD_BTN'))
      .subscribe((value) => (this.isLoadingModDelete = value));

    this.selectedModSub = this._store
      .select(SELECT_SELECTED_MOD)
      .subscribe((mod) => {
        this.selectedMod = mod;
      });

    this.modDeleteSub = this._store
      .select(SELECT_HTTP_RESPONSE('DELETE_MOD'))
      .subscribe((_) => {
        this.onDeselectMod();
        if (this.deleteModAlertCloseButton) {
          this.deleteModAlertCloseButton.nativeElement.click();
        }
      });

    this.getModsSub = this._store.select(SELECT_MODS).subscribe((mods) => {
      this.mods = mods;
    });
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.selectedModSub) {
      this.selectedModSub.unsubscribe();
    }
    if (this.loadingModDeleteSub) {
      this.loadingModDeleteSub.unsubscribe();
    }
    if (this.modDeleteSub) {
      this.modDeleteSub.unsubscribe();
    }
    if (this.getModsSub) {
      this.getModsSub.unsubscribe();
    }
  }

  public onSelectMod(id: string): void {
    this._store.dispatch(SELECT_MOD({ id }));
  }

  public onDeselectMod(): void {
    setTimeout(() => this._store.dispatch(DESELECT_MOD()), 100);
  }

  public onDeleteMod(): void {
    const id = this.selectedMod?.id;
    if (id) {
      this._store.dispatch(START_LOADING({ key: 'DELETE_MOD_BTN' }));
      this._store.dispatch(DELETE_MOD({ payload: id }));
    } else {
      this._toaster.error(
        'No mod selected, deletion has been aborted.',
        'Error'
      );
      this.onDeselectMod();
      if (this.deleteModAlertCloseButton) {
        this.deleteModAlertCloseButton.nativeElement.click();
      }
    }
  }
}
