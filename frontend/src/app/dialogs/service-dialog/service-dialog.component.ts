import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/services/service.service';
import { IService } from 'src/app/interfaces/services';
import { ServicesTableComponent } from 'src/app/table/services-table/services-table.component';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss']
})
export class ServiceDialogComponent implements OnInit {

  selected = "false";

  public flag: number;
  public service = {
    service_id: "",
    service_name: "",
    actual: false
  };
  public old_id;

  constructor(public snackBar: MatSnackBar, private _serviceService: ServiceService, 
              @Inject (MAT_DIALOG_DATA) public data: IService,
              public dialogRef: MatDialogRef<ServicesTableComponent>
            ) { }


  service_id = new FormControl('', [Validators.required, Validators.minLength(1)]);
  service_name = new FormControl('', [Validators.required, Validators.minLength(1)]);
  actual = new FormControl('', [Validators.required, Validators.minLength(1)]);

  ngOnInit(): void {
    this.old_id = this.data.service_id;
  }

  onAdd() {
    this.service.service_id = "0";
    this.service.service_name = this.service_name.value;
    this.service.actual = (this.actual.value =="true");

    console.log(this.selected);

    this._serviceService.addIService(this.service);

  }

  onEdit(){
    console.log(this.old_id);
    this.service.service_id = this.service_id.value;
    this.service.service_name = this.service_name.value;
    this.service.actual = this.actual.value;

    this._serviceService.editIService(this.old_id, this.service);

  }
  onDelete(){
    this._serviceService.deleteIService(this.old_id);
  }

}
