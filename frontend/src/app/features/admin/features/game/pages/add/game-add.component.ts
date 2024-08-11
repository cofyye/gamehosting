import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AppState>
  ) {}

  public gameAddForm: FormGroup = this._fb.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
    tag: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    startPort: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
    ]),
    endPort: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
    ]),
    slotMin: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
    ]),
    slotMax: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(65535),
    ]),
    hostBy: new FormControl<HostBy>(HostBy.CUSTOM_RESOURCES, [
      Validators.required,
    ]),
    banner: new FormControl<File | null>(null, [Validators.required]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.min(10),
      Validators.max(2500),
    ]),
  });

  public ngOnInit(): void {
    this.loadingGameAddSub = this._store
      .select(IS_LOADING('GAME_ADD_BTN'))
      .subscribe((value) => (this.isLoadingGameAdd = value));
    // this.gameAddSub = this._store
    //   .select(SELECT_GAME_RESPONSE)
    //   .subscribe((response) => {
    //     if (response?.success) {
    //       this.fileName = null;
    //       this.gameAddForm.reset();
    //     }
    //   });
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

      this.gameAddForm.get('name')?.markAsTouched();
    } else {
      this.gameAddForm.patchValue({
        name: '',
      });
      this.gameAddForm.patchValue({
        tag: '',
      });
      this.gameAddForm.get('name')?.markAsTouched();
    }
  }

  public onGameBlur(): void {
    this.gameAddForm.get('name')?.markAsTouched();
  }

  public onGameAdd(): void {
    if (this.gameAddForm.invalid) {
      this.gameAddForm.markAllAsTouched();
      return;
    }

    // const data: IGameAddRequest = {
    //   country: this.gameAddForm.get('country')?.value,
    //   town: this.gameAddForm.get('town')?.value,
    //   icon: this.gameAddForm.get('icon')?.value,
    // };

    this._store.dispatch(START_LOADING({ key: 'GAME_ADD_BTN' }));
    // this._store.dispatch(LOCATION_ADD({ payload: data }));
  }
}
