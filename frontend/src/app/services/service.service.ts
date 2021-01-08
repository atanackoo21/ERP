import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IService } from '../interfaces/services';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ServiceService{
    private readonly API_URL = 'http://localhost:8085/api/services';

    dataChange: BehaviorSubject<IService[]> = new BehaviorSubject<IService[]>([]);
    
    constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar){ }

    public getAllServices(): Observable<IService[]>{
        this.httpClient.get<IService[]>(this.API_URL).subscribe(data =>{
            this.dataChange.next(data);
        })
        return this.dataChange.asObservable();
    }

    public addIService(IService: IService): void{
        this.httpClient.post(this.API_URL, IService).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno dodat servis", "U redu",{
                    duration: 3500
                  });
                this.getAllServices();
            });
    }

    public editIService(id: any, IService: IService): void{
        this.httpClient.put(this.API_URL + "/" + id, IService).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno modifikovan servis", "U redu",{
                    duration: 3500
                  });
                this.getAllServices();
            }
        );
    }

    public deleteIService(id: number): void{
        this.httpClient.delete(this.API_URL + '/'+ id).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno izbrisan servis", "U redu",{
                    duration: 3500
                  });
                this.getAllServices();
            });
    }
}