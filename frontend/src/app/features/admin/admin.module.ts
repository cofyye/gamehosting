import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [AdminRoutingModule, CommonModule, ButtonModule, InputTextModule],
  providers: [],
  exports: [],
})
export class AdminModule {}
