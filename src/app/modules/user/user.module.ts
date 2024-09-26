import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { ServicesComponent } from './components/services-component/services.component';
import { InviewDirective } from '../shared/in-view.directive';

@NgModule({
  declarations: [
    HomeComponent,
    ServicesComponent,
    InviewDirective
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
