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
import { IServerResponse } from '../../../../shared/models/server-response.model';

@Component({
  selector: 'app-server-all',
  templateUrl: './server-all.component.html',
  styleUrl: './server-all.component.css',
})
export class ServerAllComponent {
  // @ViewChild('deleteServerAlertCloseButton')
  // deleteServerAlertCloseButton!: ElementRef<HTMLButtonElement>;
  // private routeSub!: Subscription;
  // private serverDeleteSub!: Subscription;
  // private loadingServerDeleteSub!: Subscription;
  // private getServersSub!: Subscription;
  // public servers: IModResponse[] = [];
  // public environment = environment;
  // public selectedServer: IServerResponse | null | undefined = null;
  // public selectedServerSub!: Subscription;
  // public isLoadingServerDelete: boolean = false;
  // constructor(
  //   private readonly _toaster: ToasterService,
  //   private readonly _route: ActivatedRoute,
  //   private readonly _store: Store<AppState>
  // ) {}
  // public ngOnInit(): void {
  //   this.routeSub = this._route.data.subscribe((data) => {
  //     this.servers = data['servers'];
  //   });
  //   this.loadingServerDeleteSub = this._store
  //     .select(IS_LOADING('DELETE_SERVER_BTN'))
  //     .subscribe((value) => (this.isLoadingServerDelete = value));
  //   this.selectedServerSub = this._store
  //     .select(SELECT_SELECTED_SERVER)
  //     .subscribe((server) => {
  //       this.selectedServer = server;
  //     });
  //   this.serverDeleteSub = this._store
  //     .select(SELECT_HTTP_RESPONSE('DELETE_SERVER'))
  //     .subscribe((_) => {
  //       this.onDeselectServer();
  //       if (this.deleteServerAlertCloseButton) {
  //         this.deleteServerAlertCloseButton.nativeElement.click();
  //       }
  //     });
  //   this.getServersSub = this._store
  //     .select(SELECT_SERVERS)
  //     .subscribe((servers) => {
  //       this.servers = servers;
  //     });
  // }
  // public ngOnDestroy(): void {
  //   if (this.routeSub) {
  //     this.routeSub.unsubscribe();
  //   }
  //   if (this.selectedServerSub) {
  //     this.selectedServerSub.unsubscribe();
  //   }
  //   if (this.loadingServerDeleteSub) {
  //     this.loadingServerDeleteSub.unsubscribe();
  //   }
  //   if (this.serverDeleteSub) {
  //     this.serverDeleteSub.unsubscribe();
  //   }
  //   if (this.getServersSub) {
  //     this.getServersSub.unsubscribe();
  //   }
  // }
  // public onSelectServer(id: string): void {
  //   this._store.dispatch(SELECT_SERVER({ id }));
  // }
  // public onDeselectServer(): void {
  //   setTimeout(() => this._store.dispatch(DESELECT_SERVER()), 100);
  // }
  // public onDeleteMod(): void {
  //   const id = this.selectedServer?.id;
  //   if (id) {
  //     this._store.dispatch(START_LOADING({ key: 'DELETE_SERVER_BTN' }));
  //     this._store.dispatch(DELETE_SERVER({ payload: id }));
  //   } else {
  //     this._toaster.error(
  //       'No server selected, deletion has been aborted.',
  //       'Error'
  //     );
  //     this.onDeselectServer();
  //     if (this.deleteServerAlertCloseButton) {
  //       this.deleteServerAlertCloseButton.nativeElement.click();
  //     }
  //   }
  // }
}
