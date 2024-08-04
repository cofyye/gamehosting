import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IAcceptResponse, IDataAcceptResponse } from '../models/response.model';
import { ILocationAddRequest } from '../models/location-request.model';

@Injectable()
export class LocationService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addLocation(data: ILocationAddRequest): Observable<IAcceptResponse> {
    const formData = new FormData();
    formData.append('country', data.country);
    formData.append('town', data.town);
    formData.append('icon', data.icon);

    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/admin/location`,
      formData
    );
  }
}
