import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModule } from './dashboard/dashboard.module';
import { LocationModule } from './location/location.module';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { AdminIndexComponent } from './admin-index.component';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AdminIndexComponent,
    SidebarComponent,
    NavbarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    LocationModule,
    UserModule,
  ],
})
export class AdminFeatureModule {}
