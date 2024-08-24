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
import { ActivatedRoute } from '@angular/router';
import { ILocationResponse } from '../../../../shared/models/location-response.model';

@Component({
  selector: 'app-machine-add',
  templateUrl: './machine-add.component.html',
  styleUrl: './machine-add.component.css',
})
export class MachineAddComponent {
  // private loadingGameAddSub!: Subscription;
  // private gameAddSub!: Subscription;
  // public isLoadingGameAdd: boolean = false;
  // public allowedExtenstions = environment.IMAGE_EXTENSIONS.join(', ');
  // public fileName: string | null = null;
  // public hostBy = HostBy;
  private locationsRouteSub!: Subscription;
  public locations: ILocationResponse[] = [];
  constructor(
    private readonly _el: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) {}
  // public gameAddForm: FormGroup = this._fb.group({
  //   name: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.maxLength(50),
  //   ]),
  //   tag: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.maxLength(30),
  //   ]),
  //   startPort: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.min(1),
  //     Validators.max(65535),
  //     Validators.pattern(/^-?\d+$/),
  //   ]),
  //   endPort: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.min(1),
  //     Validators.max(65535),
  //     Validators.pattern(/^-?\d+$/),
  //   ]),
  //   hostBy: new FormControl<HostBy>(HostBy.CUSTOM_RESOURCES, [
  //     Validators.required,
  //   ]),
  //   banner: new FormControl<File | null>(null, []),
  //   description: new FormControl<string>('', [
  //     Validators.required,
  //     Validators.minLength(10),
  //     Validators.maxLength(2500),
  //   ]),
  // });
  public ngOnInit(): void {
    this.locationsRouteSub = this._route.data.subscribe((data) => {
      this.locations = data['locations'];
    });

    // this.loadingGameAddSub = this._store
    //   .select(IS_LOADING('ADD_GAME_BTN'))
    //   .subscribe((value) => (this.isLoadingGameAdd = value));
    // this.gameAddSub = this._store
    //   .select(SELECT_HTTP_RESPONSE('ADD_GAME'))
    //   .subscribe((response) => {
    //     if (response?.success) {
    //       const gameDataIcon =
    //         this._el.nativeElement.querySelector('[data-icon]');
    //       const gameDataTitle =
    //         this._el.nativeElement.querySelector('[data-title]');
    //       if (gameDataIcon) {
    //         this._renderer.addClass(gameDataIcon, 'hidden');
    //         this._renderer.setProperty(gameDataIcon, 'innerHTML', 'null');
    //       }
    //       if (gameDataTitle) {
    //         this._renderer.setProperty(
    //           gameDataTitle,
    //           'innerHTML',
    //           'Select game...'
    //         );
    //       }
    //       this.gameAddForm.reset();
    //     }
    //   });
  }
  public ngOnDestroy(): void {
    // if (this.loadingGameAddSub) {
    //   this.loadingGameAddSub.unsubscribe();
    // }
    // if (this.gameAddSub) {
    //   this.gameAddSub.unsubscribe();
    // }
    if (this.locationsRouteSub) {
      this.locationsRouteSub.unsubscribe();
    }
  }
  // onIconChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const file = input.files?.[0];
  //   if (file) {
  //     this.fileName = file.name;
  //     this.gameAddForm.patchValue({
  //       icon: file,
  //     });
  //     this.gameAddForm.get('icon')?.markAsTouched();
  //   } else {
  //     this.fileName = null;
  //     this.gameAddForm.patchValue({
  //       icon: null,
  //     });
  //     this.gameAddForm.get('icon')?.markAsTouched();
  //   }
  // }
  // public onGameSelected(selectedGame: ISelectedGame): void {
  //   console.log(selectedGame);
  //   if (selectedGame.value) {
  //     this.gameAddForm.patchValue({
  //       name: selectedGame.label,
  //     });
  //     this.gameAddForm.patchValue({
  //       tag: selectedGame.value,
  //     });
  //     this.gameAddForm.get('name')?.markAsTouched();
  //   } else {
  //     this.gameAddForm.patchValue({
  //       name: '',
  //     });
  //     this.gameAddForm.patchValue({
  //       tag: '',
  //     });
  //     this.gameAddForm.get('name')?.markAsTouched();
  //   }
  // }
  // public onGameBlur(): void {
  //   this.gameAddForm.get('name')?.markAsTouched();
  // }
  // public onGameAdd(): void {
  //   if (this.gameAddForm.invalid) {
  //     this.gameAddForm.markAllAsTouched();
  //     return;
  //   }
  //   const data: IGameAddRequest = {
  //     name: this.gameAddForm.get('name')?.value,
  //     tag: this.gameAddForm.get('tag')?.value,
  //     startPort: this.gameAddForm.get('startPort')?.value,
  //     endPort: this.gameAddForm.get('endPort')?.value,
  //     hostBy: this.gameAddForm.get('hostBy')?.value,
  //     description: this.gameAddForm.get('description')?.value,
  //   };
  //   this._store.dispatch(START_LOADING({ key: 'ADD_GAME_BTN' }));
  //   this._store.dispatch(ADD_GAME({ payload: data }));
  // }

  generateLocationSelectOption(location: ILocationResponse): string {
    return JSON.stringify({
      icon: `<img class="shrink-0 size-5 rounded-md" src="${environment.API_URL}/assets/flags/1x1/${location.countryTag}.svg" alt="${location.country}" />`,
    });
  }
}
