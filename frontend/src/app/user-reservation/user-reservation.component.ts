import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeOfServiceService } from 'src/app/services/typeOfService.service';
import { IManager } from 'src/app/interfaces/manager';
import {MatSelectModule} from '@angular/material/select';
import { ManagerTableComponent } from 'src/app/table/manager-table/manager-table.component';
import { ServiceService } from 'src/app/services/service.service';
import { EditService } from 'src/app/services/edit.service';
import { IUser } from 'src/app/interfaces/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';
import { ReservationService } from 'src/app/services/reservation.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import * as moment from 'moment';
import { IStatus } from 'src/app/interfaces/status';
import { IService } from 'src/app/interfaces/services';
import { ITypeOfService } from 'src/app/interfaces/typeOfService';
import { IWorker } from 'src/app/interfaces/worker';
import { ICustomer } from 'src/app/interfaces/customer';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserReservationComponent implements OnInit {

  times = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ]

  selected_type="";

  selected = "false";

  customer_email = "";

  selected_status = "0";
  selected_service = "1";
  selected_customer = "";
  selected_worker = ""

  old_service = "";
  old_status = "";

  public flag: number;

  public statuses: IStatus[];
  public type_of_services: ITypeOfService[];
  public workers: IWorker[];
  public customers: ICustomer[];

  public reservation = {
    reservation_id: "",
    manager_id: "",
    date: "",
    time: "",
    description: "",
    confirmation: false,
    price: "",
    customer: {
      customer_id: "1",
      user: {
        user_id: "",
        first_name: "",
        last_name: "",
        email: ""
      }
    },
    worker: {
      worker_id: "",
      user: {
        user_id: "",
        first_name: "",
        last_name: ""
      }
    },
    status: {
      status_id: "",
      status_name: ""
    },
    type_of_service: {
      type_of_service_id: "",
      name: "",
      price: "",
      service: {
        service_id: "",
        service_name: ""
      }
    }

  };

  public old_id;
  public old_user_id;

  constructor(public snackBar: MatSnackBar, private _managerService: ManagerService, 
              private _reservationService: ReservationService,
              private _editService: EditService,
              private _userService: UserService,
              private _loginService: LoginService
            ) { }

  date =  new FormControl('', [Validators.required, Validators.minLength(1)]);
  time = new FormControl('', [Validators.required, Validators.minLength(1)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1)]);
  confirmation = new FormControl('', [Validators.required, Validators.minLength(1)]);
  worker = new FormControl('', [Validators.required, Validators.minLength(1)]);
  customer = new FormControl('', [Validators.required, Validators.minLength(1)]);
  status = new FormControl('', [Validators.required, Validators.minLength(1)]);
  type_of_service = new FormControl('', [Validators.required, Validators.minLength(1)]);
  price = new FormControl('', [Validators.required, Validators.minLength(1)]);


  ngOnInit(): void {
    this._editService.getStatuses().toPromise().then(
      data => {
        this.statuses = data;
      }
    );

    this._editService.getTypeOfServices().toPromise().then(
      data => {
        this.type_of_services = data;
      }
    );

    this._userService.getCustomers().toPromise().then(
      data => {
        this.customers = data;
      }
    );
    this._userService.getWorkers().toPromise().then(
      data => {
        this.workers = data;
      }
    );
  }
  
  onAdd() {
    this.reservation.reservation_id = "0";
    this.reservation.manager_id = "1";
    this.reservation.date = moment(new Date(this.date.value)).format("YYYY-MM-DD") ;
    this.reservation.time = this.time.value;
    this.reservation.confirmation = (this.confirmation.value == "true");

    this.reservation.description = this.description.value;

    this.reservation.status.status_id = "5";
    this.reservation.type_of_service.type_of_service_id = this.selected_service;
    //this.reservation.customer.customer_id = this._loginService.getToken();
    this.reservation.worker.worker_id = this.worker.value;
    this.reservation.price = this.price.value;

    //this.reservation.customer.user.email = this.customer.value.user.email;

    this._userService.getCustomerById(this._loginService.getToken()).toPromise().then(
      data =>{
        console.log(data);
        this.reservation.customer.customer_id = data.customer_id;
      });

    this._userService.getUserById(this._loginService.getToken()).toPromise().then(
      data => {
        this.reservation.customer.user.email = data.email;
        
      });

    this._editService.getTypeOfServiceById(this.selected_service).toPromise().then(
      data =>{
        this.reservation.price = data.price;
      });

    this._reservationService.addIReservation(this.reservation);
  }

}