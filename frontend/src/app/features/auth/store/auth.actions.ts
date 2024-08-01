import { createAction, props } from '@ngrx/store';
import { ILoginStatus } from '../../../shared/models/user.model';
import { ILoginRequest, IRegisterRequest } from '../models/auth-request.model';
import { IAcceptResponse } from '../../../shared/models/response.model';

export const SAVE_AUTH = createAction(
  '[Auth Page] Save Auth Data',
  props<{ auth: ILoginStatus }>()
);

export const REGISTER = createAction(
  '[Auth] Register',
  props<{ payload: IRegisterRequest }>()
);

export const REGISTER_SUCCESS = createAction(
  '[Auth] Register Success',
  props<{ response: IAcceptResponse }>()
);

export const REGISTER_FAILURE = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const LOGIN = createAction(
  '[Auth] Login',
  props<{ payload: ILoginRequest }>()
);

export const LOGIN_SUCCESS = createAction(
  '[Auth] Login Success',
  props<{ response: IAcceptResponse }>()
);

export const LOGIN_FAILURE = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
