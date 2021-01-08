import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IStatus } from '../../interfaces/status';
import { EditService } from 'src/app/services/edit.service';
import { Observable } from 'rxjs';
import { StatusiService } from 'src/app/services/statusi.service';
import { DataSource } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {ViewEncapsulation} from '@angular/core';
import { StatusDialogComponent } from 'src/app/dialogs/status-dialog/status-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status-table',
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatusTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<any>;

  public statuses:IStatus[];

  displayedColumns = ['status_id', 'status_name', 'description', 'button'];

  constructor(private _editService: EditService, public dialog: MatDialog, private statusesService: StatusiService){}

  ngOnInit() {
    this.loadData();
  }
  // const artiklsObservable = this.artiklService.getAllArtikli();

  //       artiklsObservable.subscribe((data: Artikl[]) => {
  //           this.artikls = data;
  //       });


  public loadData() {
    const statusesObservable = this.statusesService.getAllStatusi();
    statusesObservable.subscribe((data: IStatus[]) =>{
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;  
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onButtonClick(flag: number, id: string, name: string, description: string){
      const dialogRef = this.dialog.open(StatusDialogComponent, 
        { data:{status_id: id, status_name: name, description: description}
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



