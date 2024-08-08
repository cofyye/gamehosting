import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationAllComponent } from './pages/all/location-all.component';
import { LocationAddComponent } from './pages/add/location-add.component';
import { LocationEditComponent } from './pages/edit/location-edit.component';
import { getLocationsResolver } from './resolvers/get-locations.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: LocationAllComponent,
        pathMatch: 'full',
        resolve: {
          locations: getLocationsResolver,
        },
      },
      {
        path: 'add',
        component: LocationAddComponent,
        pathMatch: 'full',
      },
      {
        path: 'edit/:locationId',
        component: LocationEditComponent,
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
