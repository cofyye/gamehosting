import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IAcceptResponse } from '../../../shared/models/response.model';
import { ILoginRequest, IRegisterRequest } from '../models/auth-request.model';

@Injectable()
export class AuthService {
  constructor(private readonly _httpClient: HttpClient) {}

  public register(data: IRegisterRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/auth/signup`,
      data
    );
  }

  public login(data: ILoginRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/auth/signin`,
      data
    );
  }
}
