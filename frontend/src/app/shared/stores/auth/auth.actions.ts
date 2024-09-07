import { createAction, props } from '@ngrx/store';
import { ILoginStatus } from '../../../shared/models/user.model';
import { IDataAcceptResponse } from '../../../shared/models/response.model';
import {
  ILoginRequest,
  IRegisterRequest,
  ITokenRequest,
} from '../../models/auth/auth-request.model';

export const SAVE_AUTH = createAction(
  '[Auth Page] Save Auth Data',
  props<{ auth: ILoginStatus }>()
);

export const REGISTER = createAction(
  '[Auth] Register',
  props<{ payload: IRegisterRequest }>()
);

export const LOGIN = createAction(
  '[Auth] Login',
  props<{ payload: ILoginRequest }>()
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

export const RESEND_VERIFICATION = createAction(
  '[Auth] Resend Verification',
  props<{
    payload: string;
  }>()
);

export const CONFIRM_VERIFICATION = createAction(
  '[Auth] Confirm Verification',
  props<{
    payload: ITokenRequest;
  }>()
);
