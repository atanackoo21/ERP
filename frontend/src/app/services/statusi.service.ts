import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStatus } from '../interfaces/status';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class StatusiService{
    private readonly API_URL = 'http://localhost:8085/api/statuses';

    dataChange: BehaviorSubject<IStatus[]> = new BehaviorSubject<IStatus[]>([]);
    
    constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar){ }

    public getAllStatusi(): Observable<IStatus[]>{
        this.httpClient.get<IStatus[]>(this.API_URL).subscribe(data =>{
            this.dataChange.next(data);
        })
        return this.dataChange.asObservable();
    }

    public addIStatus(IStatus: IStatus): void{
        this.httpClient.post(this.API_URL, IStatus).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno dodat status", "U redu",{
                    duration: 3500
                  });
                this.getAllStatusi();
            });
    }

    public editIStatus(id: any, IStatus: IStatus): void{
        this.httpClient.put(this.API_URL + "/" + id, IStatus).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno modifikovan status", "U redu",{
                    duration: 3500
                  });
                this.getAllStatusi();
            }
        );
    }

    public deleteIStatus(id: number): void{
        this.httpClient.delete(this.API_URL + '/'+ id).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno izbrisan status", "U redu",{
                    duration: 3500
                  });
                this.getAllStatusi();
            });
    }
}