import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { LocationAddComponent } from './pages/add/location-add.component';
import { LocationAllComponent } from './pages/all/location-all.component';
import { LocationEditComponent } from './pages/edit/location-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { locationReducer } from '../../../../shared/stores/location/location.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LocationEffects } from '../../../../shared/stores/location/location.effects';
import { LocationService } from '../../../../shared/services/location.service';

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
    StoreModule.forFeature('location', locationReducer),
    EffectsModule.forFeature(LocationEffects),
  ],
  providers: [LocationService],
})
export class LocationModule {}
