import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IToaster } from '../models/toaster.model';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toastSubject = new Subject<IToaster>();
  public toast$ = this.toastSubject.asObservable();

  success(message: string, title: string = 'Success') {
    this.toastSubject.next({ title, message, type: 'success' });
  }

  error(message: string, title: string = 'Error') {
    this.toastSubject.next({ title, message, type: 'error' });
  }

  info(message: string, title: string = 'Info') {
    this.toastSubject.next({ title, message, type: 'info' });
  }

  warning(message: string, title: string = 'Warning') {
    this.toastSubject.next({ title, message, type: 'warning' });
  }
}
