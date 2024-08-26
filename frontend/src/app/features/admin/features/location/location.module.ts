import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { LocationAddComponent } from './pages/add/location-add.component';
import { LocationAllComponent } from './pages/all/location-all.component';
import { LocationEditComponent } from './pages/edit/location-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountrySelectModule } from '../../../../shared/components/country-select/country-select.module';

@NgModule({
  declarations: [
    LocationAddComponent,
    LocationAllComponent,
    LocationEditComponent,
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    CountrySelectModule,
  ],
})
export class LocationModule {}
