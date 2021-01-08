import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IManager } from '../../interfaces/manager';
import { Observable } from 'rxjs';
import { TypeOfServiceService } from 'src/app/services/typeOfService.service';
import { DataSource } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import {ViewEncapsulation} from '@angular/core';
import { ServiceDialogComponent } from 'src/app/dialogs/service-dialog/service-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { TypeOfServiceDialogComponent } from 'src/app/dialogs/type-of-service-dialog/type-of-service-dialog.component';
import { ManagerService } from 'src/app/services/manager.service';
import { ManagerComponent } from 'src/app/dialogs/manager/manager.component';

@Component({
  selector: 'app-manager-table',
  templateUrl: './manager-table.component.html',
  styleUrls: ['./manager-table.component.scss']
})
export class ManagerTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<any>;

  public managers:IManager[];

  displayedColumns = ['manager_id', 'user_id', 'first_name', 'last_name' ,'email', 'phone', 'password', 'role', 'button'];

  constructor(public dialog: MatDialog, private managerService: ManagerService){}

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    const servicesObservable = this.managerService.getAllManagers();
    servicesObservable.subscribe((data: IManager[]) =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;  
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onButtonClick(flag: number, manager_id: string, user_id: string, first_name: boolean, 
                last_name: string, email: string, password: string, phone: string, role: string){
      const dialogRef = this.dialog.open(ManagerComponent, 
        { data:{manager_id: manager_id, user_id: user_id, first_name: first_name, 
          last_name: last_name, email: email, password: password, phone: phone, role: role}
      });

      dialogRef.componentInstance.flag = flag;
      //dialogRef.componentInstance.old_service = service_name;
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`The dialog was closed:  ${result}`);
        if (result == "true"){
          this.loadData();
        }
      });
  
    }
  }