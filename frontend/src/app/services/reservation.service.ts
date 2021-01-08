import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IReservation } from '../interfaces/reservation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ReservationService{
    private readonly API_URL = 'http://localhost:8085/api/reservations';

    dataChange: BehaviorSubject<IReservation[]> = new BehaviorSubject<IReservation[]>([]);
    
    constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar){ }

    public getAllReservations(): Observable<IReservation[]>{
        this.httpClient.get<IReservation[]>(this.API_URL).subscribe(data =>{
            this.dataChange.next(data);
        })
        return this.dataChange.asObservable();
    }

    public addIReservation(IReservation: any): void{
        this.httpClient.post(this.API_URL, IReservation).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno dodata rezervacija", "U redu",{
                    duration: 3500
                  });
                this.getAllReservations();
            });
    }

    public editIReservation(id: any, IReservation: any): void{
        this.httpClient.put(this.API_URL + "/" + id, IReservation).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno modifikovana rezervacija", "U redu",{
                    duration: 3500
                  });
                this.getAllReservations();
            }
        );
    }

    public deleteIReservation(id: number): void{
        this.httpClient.delete(this.API_URL + '/'+ id).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno izbrisana rezervacija", "U redu",{
                    duration: 3500
                  });
                this.getAllReservations();
            });
    }
}