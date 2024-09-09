import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../../../shared/models/response.model';
import { IUserAddRequest } from '../models/user-request.model';
import { IUserResponse } from '../models/user-response.model';

@Injectable()
export class UserService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addUser(data: IUserAddRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/admin/user`,
      data
    );
  }

  public deleteUser(id: string): Observable<IAcceptResponse> {
    return this._httpClient.delete<IAcceptResponse>(
      `${environment.API_URL}/admin/user/${id}`
    );
  }

  public getUsers(): Observable<IDataAcceptResponse<IUserResponse[]>> {
    return this._httpClient.get<IDataAcceptResponse<IUserResponse[]>>(
      `${environment.API_URL}/admin/user`
    );
  }
}
