import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserRoleGuard  implements CanActivate {
    
    constructor(private router: Router, private _loginService: LoginService, private snack: MatSnackBar){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        var user = this._loginService.getUser();
        if (user != "null"){
            return true;
        } else {
            //alert("Not valid!");
            this.snack.open("You dont have permition to access on this page!", "Ok",{
                duration: 3500
              })
            return false;
        }
    }
}