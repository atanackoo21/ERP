import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './autorization/login/login.component';
import { RegistrationComponent } from './autorization/registration/registration.component';
import { LandComponent } from './landing/land/land.component';
import {  UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoleGuard } from './services/user-role.guard';
import { roleConfig } from './interfaces/roleConfig';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { StatusTableComponent } from './table/status-table/status-table.component'
import { ServicesTableComponent } from './table/services-table/services-table.component';
import { TypeOfServiceTableComponent } from './table/type-of-service-table/type-of-service-table.component';
import { ManagerTableComponent } from './table/manager-table/manager-table.component';
import { ReservationTableComponent } from './table/reservation-table/reservation-table.component';
import { UserReservationComponent } from './user-reservation/user-reservation.component';

const routes: Routes = [
  // 
  { path: '',   redirectTo: '/land', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'land', component: LandComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'reservation', component: UserReservationComponent },
  { path: 'profile', component: UserProfileComponent , canActivate: [UserRoleGuard], data: {role: roleConfig.authRoles.user }},
  { path: 'edit', component: AdminEditComponent , canActivate: [UserRoleGuard], data: {role: roleConfig.authRoles.admin},
    children: [
      { path: 'status', component: StatusTableComponent , canActivate: [UserRoleGuard], data: {role: roleConfig.authRoles.admin}},
      { path: 'service', component: ServicesTableComponent , canActivate: [UserRoleGuard], data: {role: roleConfig.authRoles.admin}},
      { path: 'typeofservice', component: TypeOfServiceTableComponent , canActivate: [UserRoleGuard], data: {role: roleConfig.authRoles.admin}},
      { path: 'manager', component: ManagerTableComponent , canActivate: [UserRoleGuard], data: {role: roleConfig.authRoles.admin}},
      { path: 'reservation', component: ReservationTableComponent , canActivate: [UserRoleGuard], data: {role: roleConfig.authRoles.admin}}


   ]},
 
];

@NgModule({
  imports: [  
    MatSliderModule,
    RouterModule.forRoot(routes)],
  exports: [MatSliderModule, RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AdminEditComponent,
                                  StatusTableComponent,
                                  ServicesTableComponent,
                                  TypeOfServiceTableComponent,
                                  ManagerTableComponent,
                                  ReservationTableComponent]

