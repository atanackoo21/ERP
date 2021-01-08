import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IManager } from '../interfaces/manager';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ManagerService{
    private readonly API_URL = 'http://localhost:8085/api/managers';

    dataChange: BehaviorSubject<IManager[]> = new BehaviorSubject<IManager[]>([]);
    
    constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar){ }

    public getAllManagers(): Observable<IManager[]>{
        this.httpClient.get<IManager[]>(this.API_URL).subscribe(data =>{
            this.dataChange.next(data);
        })
        return this.dataChange.asObservable();
    }

    public addIManager(IManager: IManager): void{
        this.httpClient.post(this.API_URL, IManager).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno dodat menadzer", "U redu",{
                    duration: 3500
                  });
                this.getAllManagers();
            });
    }

    public editIManager(id: any, IManager: IManager): void{
        this.httpClient.put(this.API_URL + "/" + id, IManager).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno modifikovan menadzer", "U redu",{
                    duration: 3500
                  });
                this.getAllManagers();
            }
        );
    }

    public deleteIManager(id: number): void{
        this.httpClient.delete(this.API_URL + '/'+ id).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno izbrisan menadzer", "U redu",{
                    duration: 3500
                  });
                this.getAllManagers();
            });
    }
}