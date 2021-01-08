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
import { ReservationService } from 'src/app/services/reservation.service';
import { IReservation } from 'src/app/interfaces/reservation';
import { ReservationDialogComponent } from 'src/app/dialogs/reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<any>;

  public managers:IManager[];

  displayedColumns = ['reservation_id', 'date', 'time', 'price' ,'manager_id', 
                      'description', 'confirmation', 'worker',
                      'customer', 'status', 'type_of_service', 'button'];

  constructor(public dialog: MatDialog, private reservationService: ReservationService){}

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    const servicesObservable = this.reservationService.getAllReservations();
    servicesObservable.subscribe((data: IReservation[]) =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;  
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onButtonClick(flag: number, reservation_id: string, date: string, time: string, 
                price: string, manager_id: string, description: string, confirmation: string, 
                worker: string, customer: string, status: any, type_of_service: any ){
      const dialogRef = this.dialog.open(ReservationDialogComponent, 
        { data:{reservation_id: reservation_id, date: date, time: time, 
          price: price, manager_id: manager_id, description: description, confirmation: confirmation,
          worker: worker, customer: customer, status: status, type_of_service: type_of_service}
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