import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModule } from './dashboard/dashboard.module';
import { LocationModule } from './location/location.module';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { AdminIndexComponent } from './admin-index.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminIndexComponent,
    SidebarComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, RouterModule, DashboardModule, LocationModule],
})
export class AdminFeatureModule {}
