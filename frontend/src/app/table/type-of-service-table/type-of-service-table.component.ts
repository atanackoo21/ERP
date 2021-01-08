import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ITypeOfService } from '../../interfaces/typeOfService';
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

@Component({
  selector: 'app-type-of-service-table',
  templateUrl: './type-of-service-table.component.html',
  styleUrls: ['./type-of-service-table.component.scss']
})
export class TypeOfServiceTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<any>;

  public services:ITypeOfService[];

  displayedColumns = ['type_of_service_id', 'name', 'description', 'price' ,'actual', 'button'];

  constructor(public dialog: MatDialog, private typeOfServiceService: TypeOfServiceService){}

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    const servicesObservable = this.typeOfServiceService.getAllTypeOfServices();
    servicesObservable.subscribe((data: ITypeOfService[]) =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;  
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onButtonClick(flag: number, type_of_service_id: string, name: string, actual: boolean, price: string, description: string, service: object){
      const dialogRef = this.dialog.open(TypeOfServiceDialogComponent, 
        { data:{type_of_service_id: type_of_service_id, name: name, actual: actual, price: price, description: description, service: service}
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