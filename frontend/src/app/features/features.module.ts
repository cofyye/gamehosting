import { NgModule } from '@angular/core';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [],
  imports: [AdminModule, AuthModule],
  exports: [],
})
export class FeaturesModule {}
