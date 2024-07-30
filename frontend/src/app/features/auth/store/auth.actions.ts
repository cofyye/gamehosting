import { createAction, props } from '@ngrx/store';
import { ILoginStatus } from '../../../shared/models/user.model';
import { IRegisterRequest } from '../models/auth-request.model';
import { IAcceptResponse } from '../../../shared/models/response.model';

export const saveAuth = createAction(
  '[Auth Page] Save Auth Data',
  props<{ auth: ILoginStatus }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ payload: IRegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: IAcceptResponse }>()
);
