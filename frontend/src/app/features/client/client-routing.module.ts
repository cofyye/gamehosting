import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientIndexComponent } from './features/client-index.component';

const routes: Routes = [
  {
    path: '',
    component: ClientIndexComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
