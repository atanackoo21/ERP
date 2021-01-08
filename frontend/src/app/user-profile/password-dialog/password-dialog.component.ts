import { Component, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators, Form} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
  flagForm: Form;
  old_password_data: string = "1";
  old_password_error: boolean = false;

  public user = {
    user_id: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phone: "",
    role: ""
  }

  old_password = new FormControl('', [Validators.required, Validators.minLength(1)]);
  new_password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  repeat_new_password = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(private _userService: UserService, private _loginService: LoginService) { }

  ngOnInit(): void {
    this._userService.getUserById(this._loginService.getToken()).toPromise().then(
      data => {
        this.user = data[0];
        this.old_password_data = this.user.password;
      });
  }

  onCancel(){
    console.log("Cancel");
  }

  onChange(): void{
    this.user.password =  this.new_password.value;
    this._userService.putUser(this.user, this.user.user_id)
    .toPromise().then(data => 
      console.log(data))
  }

  onOldPassword(data){
    if(data == this.old_password_data){
      this.old_password_error = true;
    } else {
      this.old_password_error = false;
    }

  }
}
