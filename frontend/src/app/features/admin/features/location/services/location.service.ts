import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../../environments/environment';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../../../../shared/models/response.model';
import { ILocationAddRequest } from '../models/location-request.model';
import { ILocationResponse } from '../models/location-response.model';

@Injectable()
export class LocationService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addLocation(data: ILocationAddRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/admin/location`,
      data
    );
  }

  public deleteLocation(id: string): Observable<IAcceptResponse> {
    return this._httpClient.delete<IAcceptResponse>(
      `${environment.API_URL}/admin/location/${id}`
    );
  }

  public getLocations(): Observable<IDataAcceptResponse<ILocationResponse[]>> {
    return this._httpClient.get<IDataAcceptResponse<ILocationResponse[]>>(
      `${environment.API_URL}/admin/location`
    );
  }
}
