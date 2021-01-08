import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { EditService } from '../services/edit.service';
import { IService } from '../interfaces/services';
import { DataRowOutlet } from '@angular/cdk/table';
import { IStatus } from '../interfaces/status';
import { ITypeOfService } from '../interfaces/typeOfService';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AdminEditComponent implements OnInit {
  public services:IService[];
  public statuses: IStatus[];
  public typeOfServices: ITypeOfService[];

  constructor(private _editService: EditService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._editService.getServices().toPromise().then(
    data =>{
      this.services = data;
    });
    this._editService.getStatuses().toPromise().then(
      data =>{
        this.statuses = data;
    });
    this._editService.getTypeOfServices().toPromise().then(
        data =>{
          this.typeOfServices = data;
    });
  }

  showStatuses(){
    this.router.navigate(['status'], {relativeTo: this.route});
  }

  showServices(){
    this.router.navigate(['service'], {relativeTo: this.route});
  }

  showTypeOfServices(){
    this.router.navigate(['typeofservice'], {relativeTo: this.route});
  }

  showManagers(){
    this.router.navigate(['manager'], {relativeTo: this.route});
  }

  showReservations(){
    this.router.navigate(['reservation'], {relativeTo: this.route});

  }
}
