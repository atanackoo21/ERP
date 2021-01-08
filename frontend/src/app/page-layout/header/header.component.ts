import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogged: boolean = false;

  adminLogged: boolean = false;

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    if (this._loginService.getUser() == "customer"){
      this.userLogged = true;
    } else if (this._loginService.getUser() == "manager"){
      this.adminLogged = true;
    } else{
      this.userLogged = false;
      this.adminLogged = false;
    }
  }

  logOut(): void {
    this._loginService.logOut();
  }


}
