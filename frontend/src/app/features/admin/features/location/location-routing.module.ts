import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllComponent } from './pages/all/all.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AllComponent,
        pathMatch: 'full',
      },
      {
        path: ':locationId',
        component: EditComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
