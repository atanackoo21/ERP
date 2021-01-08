import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { UserService } from '../services/user.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public users = [];
  public user = {
    user_id: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phone: "",
    role: ""
  }

  constructor(public dialog: MatDialog, private _userService: UserService, private _loginService: LoginService, 
              private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
    this._userService.getUserById(this._loginService.getToken())
    .toPromise().then(data => {
      
      this.user = data[0];
      console.log(data)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed:  ${result}`);
    });

  }


}
