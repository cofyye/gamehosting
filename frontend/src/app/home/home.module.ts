import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
})
export class HomeModule {}
