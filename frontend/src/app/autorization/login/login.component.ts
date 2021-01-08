import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  eyeFieldIndicator: boolean;
  errorMessage: boolean = false;

  formData = {
    email: "",
    password: ""
  }

  constructor(private _loginService: LoginService, @Inject(DOCUMENT) private document: Document) { 
    this.eyeFieldIndicator = false;
  }

  ngOnInit(): void {
  }

  onSubmit(data){
    this.formData.email = data.email;
    this.formData.password = data.password;
    
    console.log(data);

    this._loginService.login(this.formData).toPromise().then(
      data => {
        this._loginService.setUserAndToken(data[0].token, data[0].role);
        this.document.location.href = 'http://localhost:4200/land';
      }).catch((e: any) => this.errorHandler(e));
      
  }

  onClickEyeField(){
    this.eyeFieldIndicator = !this.eyeFieldIndicator;
  }

  errorHandler(error: any): void{
    this.errorMessage = true;
    console.log(error);
    //alert(error)
  }

}
