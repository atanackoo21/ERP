import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './autorization/login/login.component';
import { RegistrationComponent } from './autorization/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './page-layout/header/header.component';
import { LandComponent } from './landing/land/land.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FooterComponent } from './page-layout/footer/footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PasswordDialogComponent } from './user-profile/password-dialog/password-dialog.component';
import { EditService } from './services/edit.service';
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatButtonModule } from '@angular/material/button';
import { UserRoleGuard } from '../app/services/user-role.guard';     
import { UserService } from './services/user.service';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { StatusTableComponent } from './table/status-table/status-table.component';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ServicesTableComponent } from './table/services-table/services-table.component';
import { StatusiService } from './services/statusi.service';
import { StatusDialogComponent } from './dialogs/status-dialog/status-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceDialogComponent } from './dialogs/service-dialog/service-dialog.component';
import { ServiceService } from './services/service.service';
import {MatSelectModule} from '@angular/material/select';
import { TypeOfServiceDialogComponent } from './dialogs/type-of-service-dialog/type-of-service-dialog.component';
import { TypeOfServiceTableComponent } from './table/type-of-service-table/type-of-service-table.component';
import { TypeOfServiceService } from './services/typeOfService.service';
import { ManagerService } from './services/manager.service';
import { ManagerComponent } from './dialogs/manager/manager.component';
import { ManagerTableComponent } from './table/manager-table/manager-table.component';
import { ReservationTableComponent } from './table/reservation-table/reservation-table.component';
import { ReservationDialogComponent } from './dialogs/reservation-dialog/reservation-dialog.component';
import { ReservationService } from './services/reservation.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, NativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import { UserReservationComponent } from './user-reservation/user-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    HeaderComponent,
    LandComponent,
    FooterComponent,
    UserProfileComponent,
    PasswordDialogComponent,
    AdminEditComponent,
    StatusTableComponent,
    ServicesTableComponent,
    StatusDialogComponent,
    ServiceDialogComponent,
    TypeOfServiceDialogComponent,
    TypeOfServiceTableComponent,
    ManagerComponent,
    ManagerTableComponent,
    ReservationTableComponent,
    ReservationDialogComponent,
    UserReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  providers: [UserService, UserRoleGuard, EditService,
     StatusiService, ServiceService, TypeOfServiceService, 
     ManagerService, ReservationService, NativeDateAdapter],
  bootstrap: [HomeComponent]
})
export class AppModule { }
