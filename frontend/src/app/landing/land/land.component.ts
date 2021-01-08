import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class LandComponent implements OnInit {

  logged: boolean = false;

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    if(this._loginService.getUser() == "customer" || this._loginService.getUser() == 'manager' || this._loginService.getUser() == 'worker' ){
      console.log(this._loginService.getUser());
      this.logged = true;
    } else{
      this.logged = false;
    }
  }

}
