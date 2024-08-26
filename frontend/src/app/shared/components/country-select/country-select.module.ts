import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectComponent } from './country-select.component';

@NgModule({
  declarations: [CountrySelectComponent],
  imports: [CommonModule],
  providers: [],
  exports: [CountrySelectComponent],
})
export class CountrySelectModule {}
