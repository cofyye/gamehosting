import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { LocationAddComponent } from './pages/add/location-add.component';
import { LocationAllComponent } from './pages/all/location-all.component';
import { LocationEditComponent } from './pages/edit/location-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountrySelectComponent } from '../../../../shared/components/country-select/country-select.component';

@NgModule({
  declarations: [
    LocationAddComponent,
    LocationAllComponent,
    LocationEditComponent,
    CountrySelectComponent,
  ],
  imports: [CommonModule, LocationRoutingModule, ReactiveFormsModule],
})
export class LocationModule {}
