import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../../../shared/models/response.model';
import { IServerAddRequest } from '../models/server-request.model';
import { IServerResponse } from '../models/server-response.model';

@Injectable()
export class ServerService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addServer(data: IServerAddRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/admin/server`,
      data
    );
  }

  public deleteServer(id: string): Observable<IAcceptResponse> {
    return this._httpClient.delete<IAcceptResponse>(
      `${environment.API_URL}/admin/server/${id}`
    );
  }

  public getServers(): Observable<IDataAcceptResponse<IServerResponse[]>> {
    return this._httpClient.get<IDataAcceptResponse<IServerResponse[]>>(
      `${environment.API_URL}/admin/server`
    );
  }
}
