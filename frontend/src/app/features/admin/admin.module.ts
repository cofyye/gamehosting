import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminFeatureModule } from './features/admin-feature.module';

@NgModule({
  declarations: [],
  imports: [AdminRoutingModule, CommonModule, AdminFeatureModule],
  providers: [],
  exports: [],
})
export class AdminModule {}
