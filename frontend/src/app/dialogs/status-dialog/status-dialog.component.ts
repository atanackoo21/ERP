import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EditService } from 'src/app/services/edit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatusTableComponent } from 'src/app/table/status-table/status-table.component';
import { IStatus } from 'src/app/interfaces/status';
import { StatusiService } from 'src/app/services/statusi.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent implements OnInit {
  public flag: number;
  public status = {
    status_id: "",
    status_name: "",
    description: ""
  };
  public old_id;

  constructor(public snackBar: MatSnackBar, private _statusService: StatusiService, 
              @Inject (MAT_DIALOG_DATA) public data: IStatus,
              public dialogRef: MatDialogRef<StatusTableComponent>
            ) { }


  status_id = new FormControl('', [Validators.required, Validators.minLength(1)]);
  status_name = new FormControl('', [Validators.required, Validators.minLength(1)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1)]);

  ngOnInit(): void {
    this.old_id = this.data.status_id;
  }

  onAdd() {
    this.status.status_id = "0";
    this.status.status_name = this.status_name.value;
    this.status.description = this.description.value;

    this._statusService.addIStatus(this.status);


    this.snackBar.open("Uspešno dodat status: " + this.status.status_name, "U redu",{
      duration: 3500
    });

  }
  onEdit(){
    console.log(this.old_id);
    this.status.status_id = this.status_id.value;
    this.status.status_name = this.status_name.value;
    this.status.description = this.description.value;

    this._statusService.editIStatus(this.old_id, this.status);

  }
  onDelete(){
    this._statusService.deleteIStatus(this.old_id);
  }
 

}
