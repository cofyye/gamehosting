import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientFeatureModule } from './features/client-feature.module';

@NgModule({
  declarations: [],
  imports: [ClientRoutingModule, CommonModule, ClientFeatureModule],
  providers: [],
  exports: [],
})
export class ClientModule {}
