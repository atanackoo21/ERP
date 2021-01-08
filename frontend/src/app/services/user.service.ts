import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { IStatus } from '../interfaces/status';
import { error } from '@angular/compiler/src/util';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { IUser } from '../interfaces/user';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ICustomer } from '../interfaces/customer';
import { IWorker } from '../interfaces/worker';

const local_url = "http://localhost:8085/api/users";

const customer_url = "http://localhost:8085/api/customers";

const worker_url = "http://localhost:8085/api/workers";

@Injectable({
  providedIn: 'root'
})

export class UserService{
    private readonly API_URL = 'http://localhost:8085/api/users';

    constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar){}

    dataChange: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

    getUserById(id: any): Observable<IUser>{
        return this.httpClient.get<IUser>(local_url+ "/" + id);
    }

    putUser(data: any, id: any): Observable<any>{
      return this.httpClient.put("http://localhost:8085/api/users/" + id, data)
    }

    deleteUser(id: any): Observable<any>{
      return this.httpClient.delete("http://localhost:8085/api/users/" + id)
    }
    
    public getAllUsers(): Observable<IUser[]>{
        this.httpClient.get<IUser[]>(this.API_URL).subscribe(data =>{
            this.dataChange.next(data);
        })
        return this.dataChange.asObservable();
    }

    public addIUser(IUser: IUser): void{
        this.httpClient.post(this.API_URL, IUser).subscribe(
            res => console.log('HTTP response', res),
            err =>{
       
                this.matSnackBar.open(err.error, "U redu",{
                    duration: 3500
                  });
            },
            () => {
                this.matSnackBar.open("Uspešno dodat user", "U redu",{
                    duration: 3500
                  });
                this.getAllUsers();
            });
    }

    public editIUser(id: any, IUser: IUser): void{
        this.httpClient.put(this.API_URL + "/" + id, IUser).subscribe(
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
                this.getAllUsers();
            }
        );
    }

    public deleteIUser(id: number): void{
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
                this.getAllUsers();
            });
    }

    getCustomers(): Observable<ICustomer[]>{
        return this.httpClient.get<ICustomer[]>(customer_url); 
      }
    getCustomerById(id: any): Observable<ICustomer>{
      return this.httpClient.get<ICustomer>(customer_url+ "/" + id); 
    }
    
    postCustomers(data: any): Observable<any>{
    return this.httpClient.post(customer_url, data);
    }

    putCustomers(data: any, id: any): Observable<any>{
    return this.httpClient.put(customer_url + "/"+ id, data)
    }

    deleteCustomers(id: any): Observable<any>{
    return this.httpClient.delete(customer_url + "/" + id)
    }

    getWorkers(): Observable<IWorker[]>{
        return this.httpClient.get<IWorker[]>(worker_url); 
      }
    
    postWorkers(data: any): Observable<any>{
    return this.httpClient.post(worker_url, data);
    }

    putWorkers(data: any, id: any): Observable<any>{
    return this.httpClient.put(worker_url + "/"+ id, data)
    }

    deleteWorkers(id: any): Observable<any>{
    return this.httpClient.delete(worker_url + "/" + id)
    }
}