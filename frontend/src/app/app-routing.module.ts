import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { fetchUserGuard } from './shared/guards/fetch-user.guard';
import { notAuthenticatedGuard } from './shared/guards/not-authenticated.guard';
import { authenticatedGuard } from './shared/guards/authenticated.guard';
import { roleGuard } from './shared/guards/role.guard';
import { UserRole } from './shared/enums/user.enum';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [fetchUserGuard],
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [fetchUserGuard],
    canActivateChild: [notAuthenticatedGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [fetchUserGuard],
    canActivateChild: [
      authenticatedGuard,
      roleGuard([UserRole.FOUNDER, UserRole.ADMIN, UserRole.SUPPORT]),
    ],
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'client',
    canActivate: [fetchUserGuard],
    canActivateChild: [authenticatedGuard],
    loadChildren: () =>
      import('./features/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: '**',
    canActivate: [fetchUserGuard],
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
