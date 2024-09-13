import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NavBarModule } from '../shared/components/navbar/navbar.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, NavBarModule],
})
export class HomeModule {}
