import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeOfServiceService } from 'src/app/services/typeOfService.service';
import { ITypeOfService } from 'src/app/interfaces/typeOfService';
import { ServicesTableComponent } from 'src/app/table/services-table/services-table.component';
import { MatSelectModule } from '@angular/material/select';
import { TypeOfServiceTableComponent } from 'src/app/table/type-of-service-table/type-of-service-table.component';
import { ServiceService } from 'src/app/services/service.service';
import { IService } from 'src/app/interfaces/services';
import { EditService } from 'src/app/services/edit.service';

@Component({
  selector: 'app-type-of-service-dialog',
  templateUrl: './type-of-service-dialog.component.html',
  styleUrls: ['./type-of-service-dialog.component.scss']
})
export class TypeOfServiceDialogComponent implements OnInit {

  selected = "yyyyyy";

  selected_service = "09999";

  services: IService[];

  public flag: number;

  public old_service: string = "0";


  public type_of_service = {
    type_of_service_id: "1",
    actual: false,
    description: "",
    name: "",
    price: "",
    service: {
      service_id: "",
      service_name: ""
    }

  };

  public old_id;

  constructor(public snackBar: MatSnackBar, private _typeOfServiceService: TypeOfServiceService, 
              @Inject (MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TypeOfServiceTableComponent>,
              private _serviceService: ServiceService,
              private _editService: EditService
            ) { }

  type_of_service_id = new FormControl('', [Validators.required, Validators.minLength(1)]);
  name = new FormControl('', [Validators.required, Validators.minLength(1)]);
  actual = new FormControl('', [Validators.required, Validators.minLength(1)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1)]);
  price = new FormControl('', [Validators.required, Validators.minLength(1)]);


  ngOnInit(): void {
    this.old_id = this.data.type_of_service_id;

    if (this.flag == 2)
      this.selected = this.data.actual.toString();

    this.selected_service = this.data.service.service_name;

    console.log(this.selected_service)

    this._editService.getServices().toPromise().then(
      data => {
        this.services = data;
      }
    );
    }

  onAdd() {
    console.log(this.selected_service);

    this.type_of_service.type_of_service_id = "0";
    this.type_of_service.name = this.name.value;
    this.type_of_service.actual = (this.actual.value =="true");
    this.type_of_service.description = this.description.value;
    this.type_of_service.price = this.price.value;
    this.type_of_service.service.service_id = this.selected_service;
    this.type_of_service.service.service_name = "";
    
    this._typeOfServiceService.addITypeOfService(this.type_of_service);

  }

  onEdit(){
    this.type_of_service.type_of_service_id = this.old_id;
    this.type_of_service.name = this.name.value;
    this.type_of_service.actual = (this.actual.value =="true");
    this.type_of_service.description = this.description.value;
    this.type_of_service.price = this.price.value;
    this.type_of_service.service.service_id = this.selected_service;
    this.type_of_service.service.service_name = "";

    this._typeOfServiceService.editITypeOfService(this.old_id, this.type_of_service);

  }
  onDelete(){
    this._typeOfServiceService.deleteITypeOfService(this.old_id);
  }

}