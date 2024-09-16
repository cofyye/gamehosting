import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerRoutingModule } from './server-routing.module';
import { UserServersComponent } from './pages/user-servers/user-servers.component';
import { ServerInfoComponent } from './pages/server-info/server-info.component';

@NgModule({
  declarations: [UserServersComponent, ServerInfoComponent],
  imports: [CommonModule, ServerRoutingModule],
})
export class ServerModule {}
