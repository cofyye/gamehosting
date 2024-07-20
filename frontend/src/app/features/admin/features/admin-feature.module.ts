import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModule } from './dashboard/dashboard.module';
import { LocationModule } from './location/location.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardModule, LocationModule],
})
export class AdminFeatureModule {}
