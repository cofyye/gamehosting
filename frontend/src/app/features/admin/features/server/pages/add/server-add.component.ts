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
import { ToasterService } from '../../../../../../shared/services/toaster.service';
import {
  DOCKER_IMAGE_REGEX,
  STARTUP_DOCKER_ENVIRONMENT_NAME_REGEX,
} from '../../../../../../shared/utils/regex.constants';
import { IStartupVariable } from '../../../../../../shared/models/mod.model';
import { IModAddRequest } from '../../../../shared/models/mod-request.model';
import { ADD_MOD } from '../../../../shared/stores/mod/mod.actions';

@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html',
  styleUrl: './server-add.component.css',
})
export class ServerAddComponent {
  // private loadingModAddSub!: Subscription;
  // private modAddSub!: Subscription;
  // private routeSub!: Subscription;
  // public isLoadingModAdd: boolean = false;
  // public games: IGameResponse[] = [];
  // public startupVariables: IStartupVariable[] = [];
  // public dockerFile: string | null = null;
  // constructor(
  //   private readonly _el: ElementRef,
  //   private readonly _renderer: Renderer2,
  //   private readonly _fb: FormBuilder,
  //   private readonly _route: ActivatedRoute,
  //   private readonly _toaster: ToasterService,
  //   private readonly _store: Store<AppState>
  // ) {}
  // public modAddForm: FormGroup = this._fb.group({
  //   gameId: new FormControl<string>('', [Validators.required, uuidValidator()]),
  //   modName: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.maxLength(40),
  //   ]),
  //   dockerImage: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.maxLength(40),
  //     Validators.pattern(DOCKER_IMAGE_REGEX),
  //   ]),
  //   description: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.minLength(10),
  //     Validators.maxLength(2500),
  //   ]),
  //   dockerFile: new FormControl<File | null>(null, [Validators.required]),
  //   startupCommand: new FormControl<string>('', [Validators.required]),
  //   startupVariables: new FormControl<string>('', [Validators.required]),
  // });
  // public ngOnInit(): void {
  //   this.routeSub = this._route.data.subscribe((data) => {
  //     this.games = data['games'] as IGameResponse[];
  //   });
  //   this.loadingModAddSub = this._store
  //     .select(IS_LOADING('ADD_MOD_BTN'))
  //     .subscribe((value) => (this.isLoadingModAdd = value));
  //   this.modAddSub = this._store
  //     .select(SELECT_HTTP_RESPONSE('ADD_MOD'))
  //     .subscribe((response) => {
  //       if (response?.success) {
  //         this.onResetMod();
  //       }
  //     });
  // }
  // public ngOnDestroy(): void {
  //   if (this.loadingModAddSub) {
  //     this.loadingModAddSub.unsubscribe();
  //   }
  //   if (this.modAddSub) {
  //     this.modAddSub.unsubscribe();
  //   }
  //   if (this.routeSub) {
  //     this.routeSub.unsubscribe();
  //   }
  // }
  // public onAddMod(): void {
  //   this.modAddForm.patchValue({
  //     startupVariables: JSON.stringify(this.startupVariables),
  //   });
  //   if (this.modAddFormHasErrors()) {
  //     return;
  //   }
  //   const data: IModAddRequest = {
  //     gameId: this.modAddForm.get('gameId')?.value,
  //     modName: this.modAddForm.get('modName')?.value,
  //     dockerImage: this.modAddForm.get('dockerImage')?.value,
  //     description: this.modAddForm.get('description')?.value,
  //     dockerFile: this.modAddForm.get('dockerFile')?.value,
  //     startupCommand: this.modAddForm.get('startupCommand')?.value,
  //     startupVariables: this.modAddForm.get('startupVariables')?.value,
  //   };
  //   this._store.dispatch(START_LOADING({ key: 'ADD_MOD_BTN' }));
  //   this._store.dispatch(ADD_MOD({ payload: data }));
  // }
  // public onResetMod(): void {
  //   this.resetSelectGame();
  //   this.modAddForm.reset();
  // }
  // public onSelectGame(event: Event) {
  //   const selectEl = event.target as HTMLSelectElement;
  //   this.modAddForm.patchValue({
  //     gameId: selectEl.value,
  //   });
  // }
  // public generateGameSelectOption(game: IGameResponse): string {
  //   return JSON.stringify({
  //     icon: `<img class="shrink-0 size-5 rounded-md" src="${environment.API_URL}/assets/games/${game.tag}.png" alt="${game.name}" />`,
  //   });
  // }
  // private resetSelectGame(): void {
  //   const gameDataIcon = this._el.nativeElement.querySelector(
  //     'button[id="mod-game-btn"] > [data-icon]'
  //   );
  //   const gameDataTitle = this._el.nativeElement.querySelector(
  //     'button[id="mod-game-btn"] > [data-title]'
  //   );
  //   const selectedGame = this._el.nativeElement.querySelector(
  //     'div.data-mod-game > div.selected'
  //   );
  //   if (gameDataIcon) {
  //     this._renderer.addClass(gameDataIcon, 'hidden');
  //     this._renderer.setProperty(gameDataIcon, 'innerHTML', 'null');
  //   }
  //   if (gameDataTitle) {
  //     this._renderer.setProperty(
  //       gameDataTitle,
  //       'innerHTML',
  //       'Select game for mod...'
  //     );
  //   }
  //   if (selectedGame) {
  //     this._renderer.removeClass(selectedGame, 'selected');
  //   }
  // }
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
