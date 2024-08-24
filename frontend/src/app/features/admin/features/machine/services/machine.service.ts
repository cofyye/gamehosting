import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../../environments/environment';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../../../../shared/models/response.model';
import { IMachineAddRequest } from '../models/machine-request.model';
import { IMachineResponse } from '../models/machine-response.model';

@Injectable()
export class MachineService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addMachine(data: IMachineAddRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/admin/location`,
      data
    );
  }

  public deleteMachine(id: string): Observable<IAcceptResponse> {
    return this._httpClient.delete<IAcceptResponse>(
      `${environment.API_URL}/admin/machine/${id}`
    );
  }

  public getMachines(): Observable<IDataAcceptResponse<IMachineResponse[]>> {
    return this._httpClient.get<IDataAcceptResponse<IMachineResponse[]>>(
      `${environment.API_URL}/admin/machine`
    );
  }
}
