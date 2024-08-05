import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IAcceptResponse, IDataAcceptResponse } from '../models/response.model';
import {
  ILoginRequest,
  IRegisterRequest,
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
}
