import { createAction, props } from '@ngrx/store';
import { ILoginStatus } from '../../../shared/models/user.model';

export const saveAuth = createAction(
  '[Auth Page] Save Auth Data',
  props<{ auth: ILoginStatus }>()
);
