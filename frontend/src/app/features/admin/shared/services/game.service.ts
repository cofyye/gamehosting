import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../../../shared/models/response.model';
import { IGameAddRequest } from '../models/game-request.model';
import { IGameResponse } from '../models/game-response.model';

@Injectable()
export class GameService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addGame(data: IGameAddRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/admin/game`,
      data
    );
  }

  public deleteGame(id: string): Observable<IAcceptResponse> {
    return this._httpClient.delete<IAcceptResponse>(
      `${environment.API_URL}/admin/game/${id}`
    );
  }

  public getGames(): Observable<IDataAcceptResponse<IGameResponse[]>> {
    return this._httpClient.get<IDataAcceptResponse<IGameResponse[]>>(
      `${environment.API_URL}/admin/game`
    );
  }
}
