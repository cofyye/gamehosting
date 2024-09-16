import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationAllComponent } from './pages/all/location-all.component';
import { LocationAddComponent } from './pages/add/location-add.component';
import { LocationEditComponent } from './pages/edit/location-edit.component';
import { getLocationsResolver } from '../../shared/resolvers/get-locations.resolver';
import { getLocationResolver } from '../../shared/resolvers/get-location.resolver';

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
        resolve: {
          location: getLocationResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
