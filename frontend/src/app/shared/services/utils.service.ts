import { Injectable } from '@angular/core';
import { ToasterService } from './toaster.service';
import { IAcceptResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private readonly _toasterService: ToasterService) {}

  public handleResponseToaster(response: IAcceptResponse): void {
    if (response.success) {
      this._toasterService.success(response.message, 'Success');
    } else {
      this._toasterService.error(response.message, 'Error');
    }
  }
}
