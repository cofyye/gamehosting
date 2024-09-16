import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGameResponse } from '../../../../shared/models/game-response.model';
import { environment } from '../../../../../../../environments/environment';
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import { AppState } from '../../../../../../app.state';
import { Store } from '@ngrx/store';
import { IS_LOADING } from '../../../../../../shared/stores/loader/loader.selectors';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { START_LOADING } from '../../../../../../shared/stores/loader/loader.actions';
import {
  SELECT_GAMES,
  SELECT_SELECTED_GAME,
} from '../../../../shared/stores/game/game.selectors';
import {
  DELETE_GAME,
  REMOVE_SELECTED_GAME,
  SET_SELECTED_GAME,
} from '../../../../shared/stores/game/game.actions';
import { HostBy } from '../../../../../../shared/enums/game.enum';

@Component({
  selector: 'app-game-all',
  templateUrl: './game-all.component.html',
  styleUrl: './game-all.component.css',
})
export class GameAllComponent implements OnInit {
  @ViewChild('deleteGameAlertCloseButton')
  deleteGameAlertCloseButton!: ElementRef<HTMLButtonElement>;

  private routeSub!: Subscription;
  private gameDeleteSub!: Subscription;
  private loadingGameDeleteSub!: Subscription;
  private getGamesSub!: Subscription;
  public games: IGameResponse[] = [];
  public environment = environment;
  public selectedGame: IGameResponse | null | undefined = null;
  public selectedGameSub!: Subscription;
  public isLoadingGameDelete: boolean = false;
  public hostBy = HostBy;

  constructor(
    private readonly _toaster: ToasterService,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.routeSub = this._route.data.subscribe((data) => {
      this.games = data['games'] as IGameResponse[];
    });

    this.loadingGameDeleteSub = this._store
      .select(IS_LOADING('DELETE_GAME_BTN'))
      .subscribe((value) => (this.isLoadingGameDelete = value));

    this.selectedGameSub = this._store
      .select(SELECT_SELECTED_GAME)
      .subscribe((game) => {
        this.selectedGame = game;
      });

    this.gameDeleteSub = this._store
      .select(SELECT_HTTP_RESPONSE('DELETE_GAME'))
      .subscribe((_) => {
        this.onDeselectGame();
        if (this.deleteGameAlertCloseButton) {
          this.deleteGameAlertCloseButton.nativeElement.click();
        }
      });

    this.getGamesSub = this._store.select(SELECT_GAMES).subscribe((games) => {
      this.games = games;
    });
  }

  public ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.selectedGameSub) {
      this.selectedGameSub.unsubscribe();
    }
    if (this.loadingGameDeleteSub) {
      this.loadingGameDeleteSub.unsubscribe();
    }
    if (this.gameDeleteSub) {
      this.gameDeleteSub.unsubscribe();
    }
    if (this.getGamesSub) {
      this.getGamesSub.unsubscribe();
    }
  }

  public onSelectGame(id: string): void {
    this._store.dispatch(SET_SELECTED_GAME({ id }));
  }

  public onDeselectGame(): void {
    setTimeout(() => this._store.dispatch(REMOVE_SELECTED_GAME()), 100);
  }

  public onDeleteGame(): void {
    const id = this.selectedGame?.id;
    if (id) {
      this._store.dispatch(START_LOADING({ key: 'DELETE_GAME_BTN' }));
      this._store.dispatch(DELETE_GAME({ id }));
    } else {
      this._toaster.error(
        'No game selected, deletion has been aborted.',
        'Error'
      );
      this.onDeselectGame();
      if (this.deleteGameAlertCloseButton) {
        this.deleteGameAlertCloseButton.nativeElement.click();
      }
    }
  }
}
