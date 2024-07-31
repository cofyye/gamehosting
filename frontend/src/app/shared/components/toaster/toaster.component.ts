import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToasterService } from '../../services/toaster.service';
import { IToaster } from '../../models/toaster.model';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
})
export class ToasterComponent implements OnInit, OnDestroy {
  public toasts: IToaster[] = [];
  private toasterSubscription!: Subscription;
  private idCounter = 0;

  constructor(private readonly _toasterService: ToasterService) {}

  public ngOnInit(): void {
    this.toasterSubscription = this._toasterService.toast$.subscribe(
      (toast) => {
        if (this.toasts.length > 0) {
          this.toasts = [];
        }

        const id = this.idCounter++;
        const timeoutId = setTimeout(() => this.removeToast(id), 3000);
        this.toasts.push({ ...toast, id, timeoutId });
      }
    );
  }

  public getClassType(toast: IToaster): string {
    let className = 'toast-success';

    switch (toast.type) {
      case 'success':
        className = 'toast-success';
        break;
      case 'error':
        className = 'toast-error';
        break;
      case 'info':
        className = 'toast-info';
        break;
      case 'warning':
        className = 'toast-warning';
        break;
      default:
        className = 'toast-success';
        break;
    }

    return className;
  }

  public ngOnDestroy(): void {
    this.toasterSubscription.unsubscribe();
  }

  public removeToast(id: number): void {
    const toast = this.toasts.find((toast) => toast.id === id);

    if (!toast) {
      return;
    }

    clearTimeout(toast.timeoutId);
    this.toasts = this.toasts.filter((t) => t.id !== toast.id);
  }
}
