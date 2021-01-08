import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IService } from '../../interfaces/services';
import { EditService } from 'src/app/services/edit.service';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';
import { DataSource } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {ViewEncapsulation} from '@angular/core';
import { ServiceDialogComponent } from 'src/app/dialogs/service-dialog/service-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.scss']
})
export class ServicesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<any>;

  public services:IService[];

  displayedColumns = ['service_id', 'service_name', 'actual', 'button'];

  constructor(private _editService: EditService, public dialog: MatDialog, private servicesService: ServiceService){}

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    const servicesObservable = this.servicesService.getAllServices();
    servicesObservable.subscribe((data: IService[]) =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;  
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onButtonClick(flag: number, id: string, name: string, actual: boolean){
      const dialogRef = this.dialog.open(ServiceDialogComponent, 
        { data:{service_id: id, service_name: name, actual: actual}
      });

      dialogRef.componentInstance.flag = flag;
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`The dialog was closed:  ${result}`);
        if (result == "true"){
          this.loadData();
        }
      });
  
    }
  }