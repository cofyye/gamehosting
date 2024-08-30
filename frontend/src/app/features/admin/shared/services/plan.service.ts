import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import {
  IAcceptResponse,
  IDataAcceptResponse,
} from '../../../../shared/models/response.model';
import { IPlanAddRequest } from '../models/plan-request.model';
import { IPlanResponse } from '../models/plan-response.model';

@Injectable()
export class PlanService {
  constructor(private readonly _httpClient: HttpClient) {}

  public addPlan(data: IPlanAddRequest): Observable<IAcceptResponse> {
    return this._httpClient.post<IAcceptResponse>(
      `${environment.API_URL}/admin/plan`,
      data
    );
  }

  public deletePlan(id: string): Observable<IAcceptResponse> {
    return this._httpClient.delete<IAcceptResponse>(
      `${environment.API_URL}/admin/plan/${id}`
    );
  }

  public getPlans(): Observable<IDataAcceptResponse<IPlanResponse[]>> {
    return this._httpClient.get<IDataAcceptResponse<IPlanResponse[]>>(
      `${environment.API_URL}/admin/plan`
    );
  }
}
