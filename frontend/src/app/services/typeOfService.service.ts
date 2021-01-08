import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITypeOfService } from '../interfaces/typeOfService';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TypeOfServiceService{
    private readonly API_URL = 'http://localhost:8085/api/typeofservices';

    dataChange: BehaviorSubject<ITypeOfService[]> = new BehaviorSubject<ITypeOfService[]>([]);
    
    constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar){ }

    public getAllTypeOfServices(): Observable<ITypeOfService[]>{
        this.httpClient.get<ITypeOfService[]>(this.API_URL).subscribe(data =>{
            this.dataChange.next(data);
        })
        return this.dataChange.asObservable();
    }

    public addITypeOfService(ITypeOfService: ITypeOfService): void{
        this.httpClient.post(this.API_URL, ITypeOfService).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno dodat tip usluge", "U redu",{
                    duration: 3500
                  });
                this.getAllTypeOfServices();
            });
    }

    public editITypeOfService(id: any, ITypeOfService: ITypeOfService): void{
        this.httpClient.put(this.API_URL + "/" + id, ITypeOfService).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno modifikovan tip usluge", "U redu",{
                    duration: 3500
                  });
                this.getAllTypeOfServices();
            }
        );
    }

    public deleteITypeOfService(id: number): void{
        this.httpClient.delete(this.API_URL + '/'+ id).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno izbrisan tip usluge", "U redu",{
                    duration: 3500
                  });
                this.getAllTypeOfServices();
            });
    }
}