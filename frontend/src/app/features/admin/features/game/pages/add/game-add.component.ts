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
import { imageSizeValidator } from '../../../../../../shared/validators/image-size.validator';
import { imageExtensionValidator } from '../../../../../../shared/validators/image-extension.validator';
import { environment } from '../../../../../../../environments/environment';
import { HostBy } from '../../../../../../shared/enums/game.enum';
import { ISelectedGame } from '../../../../../../shared/models/game.model';
import { SELECT_HTTP_RESPONSE } from '../../../../../../shared/stores/http/http.selectors';
import { IGameAddRequest } from '../../../../shared/models/game-request.model';
import { ADD_GAME } from '../../../../shared/stores/game/game.actions';
import { ToasterService } from '../../../../../../shared/services/toaster.service';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrl: './game-add.component.css',
})
export class GameAddComponent implements OnInit, OnDestroy {
  private loadingGameAddSub!: Subscription;
  private gameAddSub!: Subscription;
  public isLoadingGameAdd: boolean = false;
  public allowedExtenstions = environment.IMAGE_EXTENSIONS.join(', ');
  public fileName: string | null = null;
  public hostBy = HostBy;

  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _toaster: ToasterService,
    private readonly _store: Store<AppState>
  ) {}

  public gameAddForm: FormGroup = this._fb.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    tag: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
    startPort: new FormControl<string>('', [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
      Validators.pattern(/^-?\d+$/),
    ]),
    endPort: new FormControl<string>('', [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
      Validators.pattern(/^-?\d+$/),
    ]),
    hostBy: new FormControl<string>('', [Validators.required]),
    banner: new FormControl<File | null>(null, []),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(2500),
    ]),
  });

  public ngOnInit(): void {
    this.loadingGameAddSub = this._store
      .select(IS_LOADING('ADD_GAME_BTN'))
      .subscribe((value) => (this.isLoadingGameAdd = value));
    this.gameAddSub = this._store
      .select(SELECT_HTTP_RESPONSE('ADD_GAME'))
      .subscribe((response) => {
        if (response?.success) {
          this.onResetGame();
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.loadingGameAddSub) {
      this.loadingGameAddSub.unsubscribe();
    }
    if (this.gameAddSub) {
      this.gameAddSub.unsubscribe();
    }
  }

  onIconChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.fileName = file.name;
      this.gameAddForm.patchValue({
        icon: file,
      });

      this.gameAddForm.get('icon')?.markAsTouched();
    } else {
      this.fileName = null;
      this.gameAddForm.patchValue({
        icon: null,
      });
      this.gameAddForm.get('icon')?.markAsTouched();
    }
  }

  public onGameSelected(selectedGame: ISelectedGame): void {
    if (selectedGame.value) {
      this.gameAddForm.patchValue({
        name: selectedGame.label,
      });
      this.gameAddForm.patchValue({
        tag: selectedGame.value,
      });
    } else {
      this.gameAddForm.patchValue({
        name: '',
      });
      this.gameAddForm.patchValue({
        tag: '',
      });
    }
  }

  public onAddGame(): void {
    if (this.gameAddFormHasErrors()) {
      return;
    }

    const data: IGameAddRequest = {
      name: this.gameAddForm.get('name')?.value,
      tag: this.gameAddForm.get('tag')?.value,
      startPort: this.gameAddForm.get('startPort')?.value,
      endPort: this.gameAddForm.get('endPort')?.value,
      hostBy: this.gameAddForm.get('hostBy')?.value,
      description: this.gameAddForm.get('description')?.value,
    };

    this._store.dispatch(START_LOADING({ key: 'ADD_GAME_BTN' }));
    this._store.dispatch(ADD_GAME({ payload: data }));
  }

  public onResetGame(): void {
    this.resetSelectGame();
    this.resetSelectHostingType();
    this.gameAddForm.reset();
  }

  private resetSelectGame(): void {
    const gameDataIcon =
      this._el.nativeElement.querySelector('[data-game-icon]');
    const gameDataTitle =
      this._el.nativeElement.querySelector('[data-game-title]');

    if (gameDataIcon) {
      this._renderer.addClass(gameDataIcon, 'hidden');
      this._renderer.setProperty(gameDataIcon, 'innerHTML', 'null');
    }
    if (gameDataTitle) {
      this._renderer.setProperty(gameDataTitle, 'innerHTML', 'Select game...');
    }
  }

  private resetSelectHostingType(): void {
    const hostingTypeIcon = this._el.nativeElement.querySelector(
      '[data-hosting-type-icon]'
    );
    const hostingTypeDataTitle = this._el.nativeElement.querySelector(
      '[data-hosting-type-title]'
    );

    if (hostingTypeIcon) {
      this._renderer.addClass(hostingTypeIcon, 'hidden');
      this._renderer.setProperty(hostingTypeIcon, 'innerHTML', 'null');
    }
    if (hostingTypeDataTitle) {
      this._renderer.setProperty(
        hostingTypeDataTitle,
        'innerHTML',
        'Select hosting type...'
      );
    }
  }

  private gameAddFormHasErrors(): boolean {
    // Name Errors
    if (this.gameAddForm.get('name')?.errors?.['required']) {
      this._toaster.error('The game field must not be empty.', 'Error');
      return true;
    } else if (this.gameAddForm.get('name')?.errors?.['minlength']) {
      this._toaster.error(
        'The game must contain at least 2 characters.',
        'Error'
      );
      return true;
    } else if (this.gameAddForm.get('name')?.errors?.['maxlength']) {
      this._toaster.error(
        'The game must contain a maximum of 50 characters.',
        'Error'
      );
      return true;
    }

    // Tag Errors
    if (this.gameAddForm.get('tag')?.errors?.['required']) {
      this._toaster.error('The tag field must not be empty.', 'Error');
      return true;
    } else if (this.gameAddForm.get('tag')?.errors?.['minlength']) {
      this._toaster.error(
        'The tag must contain at least 2 characters.',
        'Error'
      );
      return true;
    } else if (this.gameAddForm.get('tag')?.errors?.['maxlength']) {
      this._toaster.error(
        'The tag must contain a maximum of 30 characters.',
        'Error'
      );
      return true;
    }

    // HostBy Errors
    if (this.gameAddForm.get('hostBy')?.errors?.['required']) {
      this._toaster.error('The host by field must not be empty.', 'Error');
      return true;
    }

    // Start Port Errors
    if (this.gameAddForm.get('startPort')?.errors?.['required']) {
      this._toaster.error('The start port field must not be empty.', 'Error');
      return true;
    } else if (this.gameAddForm.get('startPort')?.errors?.['min']) {
      this._toaster.error(
        'The minimum value for the start port must be 1.',
        'Error'
      );
      return true;
    } else if (this.gameAddForm.get('startPort')?.errors?.['max']) {
      this._toaster.error(
        'The maximum value for the start port must be 65535.',
        'Error'
      );
      return true;
    } else if (this.gameAddForm.get('startPort')?.errors?.['pattern']) {
      this._toaster.error('The start port must be in numeric format.', 'Error');
      return true;
    }

    // End Port Errors
    if (this.gameAddForm.get('endPort')?.errors?.['required']) {
      this._toaster.error('The end port field must not be empty.', 'Error');
      return true;
    } else if (this.gameAddForm.get('endPort')?.errors?.['min']) {
      this._toaster.error(
        'The minimum value for the end port must be 1.',
        'Error'
      );
      return true;
    } else if (this.gameAddForm.get('endPort')?.errors?.['max']) {
      this._toaster.error(
        'The maximum value for the end port must be 65535.',
        'Error'
      );
      return true;
    } else if (this.gameAddForm.get('endPort')?.errors?.['pattern']) {
      this._toaster.error('The end port must be in numeric format.', 'Error');
      return true;
    }

    // Description Errors
    if (this.gameAddForm.get('description')?.errors?.['required']) {
      this._toaster.error('The description field must not be empty.', 'Error');
      return true;
    } else if (this.gameAddForm.get('description')?.errors?.['minlength']) {
      this._toaster.error(
        'The description must contain at least 10 characters.',
        'Error'
      );
      return true;
    } else if (this.gameAddForm.get('description')?.errors?.['maxlength']) {
      this._toaster.error(
        'The description must contain a maximum of 2500 characters.',
        'Error'
      );
      return true;
    }

    // Custom Errors
    if (
      this.gameAddForm.get('hostBy')?.value != HostBy.SLOT &&
      this.gameAddForm.get('hostBy')?.value != HostBy.CUSTOM_RESOURCES
    ) {
      this._toaster.error(
        'Host By must be: slot or custom_resources.',
        'Error'
      );
      return true;
    }

    if (
      this.gameAddForm.get('startPort')?.value >=
      this.gameAddForm.get('endPort')?.value
    ) {
      this._toaster.error(
        'Start port must not be greater than or equal to end port.',
        'Error'
      );
      return true;
    }

    return false;
  }
}
