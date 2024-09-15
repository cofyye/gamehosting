import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { NavBarModule } from '../../../shared/components/navbar/navbar.module';
import { ClientIndexComponent } from './client-index.component';
import { ServerModule } from './server/server.module';

@NgModule({
  declarations: [ClientIndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    NavBarModule,
    ServerModule,
  ],
  providers: [],
})
export class ClientFeatureModule {}
