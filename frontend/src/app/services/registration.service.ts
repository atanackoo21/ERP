import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IStatus } from '../interfaces/status';
import { error } from '@angular/compiler/src/util';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { IUser } from '../interfaces/user';
import { ICustomer } from '../interfaces/customer';


const local_url = "http://localhost:8085/api/";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

registration(data: any): Observable<IUser>{
    return this.http.post<IUser>("http://localhost:8085/api/" + "users", data);
}

registrationCustomer(data: any): Observable<ICustomer>{
    return this.http.post<ICustomer>(local_url + "customers", data);
}


}