import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerRoutingModule } from './server-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerAllComponent } from './pages/all/server-all.component';
import { ServerAddComponent } from './pages/add/server-add.component';

@NgModule({
  declarations: [ServerAllComponent, ServerAddComponent],
  imports: [CommonModule, ServerRoutingModule, ReactiveFormsModule],
})
export class ServerModule {}
