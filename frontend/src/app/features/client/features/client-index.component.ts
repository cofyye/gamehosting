import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styleUrls: ['./client-index.component.css'],
})
export class ClientIndexComponent implements AfterViewInit {
  @ViewChild('gaugeCircle') gaugeCircle!: ElementRef;

  ngAfterViewInit(): void {
    if (this.gaugeCircle) {
      const percentage = 70;
      const offset = 100 - (percentage / 100) * 70;
      this.gaugeCircle.nativeElement.style.strokeDashoffset = offset;
    }
  }
}
