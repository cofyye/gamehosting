import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';

import { AllComponent } from './pages/all/all.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [AllComponent, EditComponent],
  imports: [CommonModule, LocationRoutingModule],
})
export class LocationModule {}
