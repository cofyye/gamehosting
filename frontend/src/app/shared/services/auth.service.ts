import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IAcceptResponse, IDataAcceptResponse } from '../models/response.model';
import {
  ILoginRequest,
  IRegisterRequest,
  IResetPasswordRequest,
  ITokenRequest,
} from '../models/auth/auth-request.model';
import { ILoginResponse } from '../models/auth/auth-response.model';

@Injectable()
export class AuthService {
  constructor(private readonly _httpClient: HttpClient) {}

  public register(data: IRegisterRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/auth/signup`,
      data
    );
  }

  public login(
    data: ILoginRequest
  ): Observable<IDataAcceptResponse<ILoginResponse>> {
    return this._httpClient.post<IDataAcceptResponse<ILoginResponse>>(
      `${environment.API_URL}/auth/signin`,
      data
    );
  }

  public logout(): Observable<IDataAcceptResponse<IAcceptResponse>> {
    return this._httpClient.post<IDataAcceptResponse<IAcceptResponse>>(
      `${environment.API_URL}/auth/signout`,
      {}
    );
  }

  public regenerateToken(): Observable<IDataAcceptResponse<Date>> {
    return this._httpClient.post<IDataAcceptResponse<Date>>(
      `${environment.API_URL}/auth/relogin`,
      {}
    );
  }

  public forgotPassword(email: string): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/auth/password/forgot/${email}`,
      {}
    );
  }

  public resendVerification(email: string): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/auth/verification/resend/${email}`,
      {}
    );
  }

  public confirmEmail(data: ITokenRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/auth/verification/confirm?email=${data.email}&token=${data.token}`,
      {}
    );
  }

  public resetPasswordAccess(data: ITokenRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/auth/password/reset?email=${data.email}&token=${data.token}`,
      {}
    );
  }

  public resetPassword(
    data: IResetPasswordRequest
  ): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/auth/password/change`,
      data
    );
  }
}
