import { createAction, props } from '@ngrx/store';
import { ILoginStatus } from '../../../shared/models/user.model';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../../shared/models/response.model';
import {
  ILoginRequest,
  IRegisterRequest,
} from '../../../features/auth/models/auth-request.model';

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

export const REGENERATE_TOKEN = createAction(
  '[Auth] Regenerate Token',
  props<{ response: IDataAcceptResponse<Date> }>
);

export const FORGOT_PW = createAction(
  '[Auth] Forgot Password',
  props<{
    payload: string;
  }>()
);

export const FORGOT_PW_SUCCESS = createAction(
  '[Auth] Forgot Password Success',
  props<{ response: IAcceptResponse }>()
);

export const FORGOT_PW_FAILURE = createAction(
  '[Auth] Forgot Password Failure',
  props<{ error: string }>()
);
