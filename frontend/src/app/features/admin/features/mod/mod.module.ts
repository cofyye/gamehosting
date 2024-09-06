import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './mod-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModAddComponent } from './pages/add/mod-add.component';
import { ModAllComponent } from './pages/all/mod-all.component';

@NgModule({
  declarations: [ModAllComponent, ModAddComponent],
  imports: [CommonModule, LocationRoutingModule, ReactiveFormsModule],
})
export class ModModule {}
