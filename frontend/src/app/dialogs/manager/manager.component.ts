import { Component, OnInit, Inject } from '@angular/core';
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

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  selected = "false";

  selected_service = "0";

  //user: IUser[];

  public flag: number;

  public old_service: string = "0";

  public manager = {
    manager_id: "",
    user: {
      user_id: "1",
      first_name: "???",
      last_name: "????c111",
      email: "???@AAAAA1111",
      password: "",
      phone: "???",
      role: "???"
    }
  };

  public _user= {
    user_id: "???",
    first_name: "/??",
    last_name: "??",
    email: "aleksa@/???",
    password: "",
    phone: "/???",
    role: "????"
  }

  public old_id;
  public old_user_id;

  constructor(public snackBar: MatSnackBar, private _managerService: ManagerService, 
              @Inject (MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ManagerTableComponent>,
              private _registrationService: RegistrationService,
              private _userService: UserService
            ) { }

  manager_id = new FormControl('', [Validators.required, Validators.minLength(1)]);
  user_id =  new FormControl('', [Validators.required, Validators.minLength(1)]);
  first_name = new FormControl('', [Validators.required, Validators.minLength(1)]);
  last_name = new FormControl('', [Validators.required, Validators.minLength(1)]);
  role = new FormControl('', [Validators.required, Validators.minLength(1)]);
  email = new FormControl('', [Validators.required, Validators.minLength(1)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  phone = new FormControl('', [Validators.required, Validators.minLength(1)]);


  ngOnInit(): void {
    this.old_id = this.data.manager_id;
    this.old_user_id = this.data.user_id;

    // if (this.flag == 2)
    //   this.selected = this.data.actual.toString();

    // this.selected_service = this.old_service;

    // this._editService.getServices().toPromise().then(
    //   data => {
    //     this.services = data;
    //   }
    // );
  }
  
  onAdd() {
    this.manager.manager_id = "0";
    this._user.user_id = "0";
    this._user.first_name = this.first_name.value;
    this._user.last_name = this.last_name.value;
    this._user.phone = this.phone.value;
    this._user.email = this.email.value;
    this._user.role = this.role.value;
    this._user.password = this.password.value;
    this.manager.user = this._user;


    this._registrationService.registration(this._user)
    .toPromise().then(data =>{
      console.log(data)
        this.manager.user.user_id = data[0];
        this._managerService.addIManager(this.manager)
      });
  }

  onEdit(){
    //this.manager.manager_id = this.manager_id.value;
    this._user.user_id = this.old_user_id;
    this._user.first_name = this.first_name.value;
    this._user.last_name = this.last_name.value;
    this._user.phone = this.phone.value;
    this._user.email = this.email.value;
    this._user.role = this.role.value;
    this._user.password = this.password.value;
    this.manager.user = this._user;

    this._userService.editIUser(this.old_user_id, this.manager.user);
    //this._managerService.editIManager(this.old_id, this.manager);
    //this._managerService.getAllManagers();

  }
  onDelete(){
    this._managerService.deleteIManager(this.old_id);
  }

}