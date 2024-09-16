import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminIndexComponent } from './features/admin-index.component';
import { roleGuard } from '../../shared/guards/role.guard';
import { UserRole } from '../../shared/enums/user.enum';

const routes: Routes = [
  {
    path: '',
    component: AdminIndexComponent,
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
      {
        path: 'locations',
        canActivate: [roleGuard([UserRole.FOUNDER])],
        loadChildren: () =>
          import('./features/location/location.module').then(
            (m) => m.LocationModule
          ),
      },
      {
        path: 'games',
        canActivate: [roleGuard([UserRole.FOUNDER])],
        loadChildren: () =>
          import('./features/game/game.module').then((m) => m.GameModule),
      },
      {
        path: 'machines',
        canActivate: [roleGuard([UserRole.FOUNDER])],
        loadChildren: () =>
          import('./features/machine/machine.module').then(
            (m) => m.MachineModule
          ),
      },
      {
        path: 'plans',
        canActivate: [roleGuard([UserRole.FOUNDER, UserRole.ADMIN])],
        loadChildren: () =>
          import('./features/plan/plan.module').then((m) => m.PlanModule),
      },
      {
        path: 'mods',
        canActivate: [roleGuard([UserRole.FOUNDER])],
        loadChildren: () =>
          import('./features/mod/mod.module').then((m) => m.ModModule),
      },
      {
        path: 'servers',
        canActivate: [roleGuard([UserRole.FOUNDER, UserRole.ADMIN])],
        loadChildren: () =>
          import('./features/server/server.module').then((m) => m.ServerModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
