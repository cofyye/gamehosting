import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../../../shared/models/response.model';
import { IModAddRequest } from '../models/mod-request.model';
import { IModResponse } from '../models/mod-response.model';

@Injectable()
export class ModService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addMod(data: IModAddRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/admin/mod`,
      data
    );
  }

  public deleteMod(id: string): Observable<IAcceptResponse> {
    return this._httpClient.delete<IAcceptResponse>(
      `${environment.API_URL}/admin/mod/${id}`
    );
  }

  public getMods(): Observable<IDataAcceptResponse<IModResponse[]>> {
    return this._httpClient.get<IDataAcceptResponse<IModResponse[]>>(
      `${environment.API_URL}/admin/mod`
    );
  }
}
