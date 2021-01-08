import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { LoginService } from 'src/app/services/login.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  eyeFieldIndicator: boolean = false;
  eyeFieldIndicatorAgain: boolean = false;
  addedUser = {
      user_id:"",
      first_name:"",
      last_name:"",
      password: "",
      email: "",
      phone: "",
      role: "customer"
  };
  addedCustomer = {
    customer_id: "0",
    points: 0,
    user: this.addedUser
  };

  constructor(private _registrationService: RegistrationService, private _loginService: LoginService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  onSubmit(data){
    this.addedUser = { 
      user_id: "0",
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      email: data.email,
      phone: data.phone,
      role: "customer"
    };
    this.addedCustomer = {
      customer_id: "0",
      points: 0,
      user: {
        user_id: "1",
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        email: data.email,
        phone: data.phone,
        role: "customer"
      }
    };
    this._registrationService.registration(this.addedUser)
    .toPromise().then(data =>{
      console.log(data)
        this.addedCustomer.user.user_id = data[0];
        this._loginService.setUserAndToken(data[0], "customer");
        this._registrationService.registrationCustomer(this.addedCustomer)
        .toPromise().then(
          data2 => {
            console.log(data2);
            this.document.location.href = 'http://localhost:4200/profile';
          }).catch((e: any) => this.errorHandler(e));
      }).catch((e: any) => this.errorHandler(e));

  }
  
  onClickEyeField(){
    this.eyeFieldIndicator = !this.eyeFieldIndicator;
  }

  onClickEyeFieldAgain(){
    this.eyeFieldIndicatorAgain = !this.eyeFieldIndicatorAgain;
  }

  errorHandler(error: any): void{
    console.log(error);
    alert(error);
  }

}
