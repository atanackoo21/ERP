import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStatus } from '../interfaces/status';
import { IService } from 'src/app/interfaces/services';
import { identifierModuleUrl } from '@angular/compiler';
import { ITypeOfService } from '../interfaces/typeOfService';

const local_url = "http://localhost:8085/api/";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  constructor(private http: HttpClient) { }

  getStatuses(): Observable<IStatus[]>{
    return this.http.get<IStatus[]>(local_url + "statuses"); 
  }

  postStatuses(data: any): Observable<any>{
    return this.http.post(local_url+ "statuses", data);
  }

  putStatuses(data: any, id: any): Observable<any>{
    return this.http.put(local_url + "statuses/"+ id, data)
  }

  deleteStatuses(id: any): Observable<any>{
    return this.http.delete(local_url + "statuses/" + id)
  }

  getServices(): Observable<IService[]>{
    return this.http.get<IService[]>(local_url + "services"); 
  }

  postServices(data: any): Observable<any>{
    return this.http.post(local_url + "services", data);
  }

  putServices(data: any, id: any): Observable<any>{
    return this.http.put(local_url+ "services/" + id, data)
  }

  deleteServices(id: any): Observable<any>{
    return this.http.delete(local_url + "services/" + id)
  }

  getTypeOfServices(): Observable<ITypeOfService[]>{
    return this.http.get<ITypeOfService[]>(local_url + "typeofservices"); 
  }

  postTypeOfServices(data: any): Observable<any>{
    return this.http.post(local_url + "typeofservices", data);
  }

  putTypeOfServices(data: any, id: any): Observable<any>{
    return this.http.put(local_url+ "typeofservices/" + id, data)
  }

  deleteTypeOfServices(id: any): Observable<any>{
    return this.http.delete(local_url + "typeofservices/" + id)
  }

  getTypeOfServiceById(id: any): Observable<ITypeOfService>{
    return this.http.get<ITypeOfService>(local_url+ "typeofservices/" + id);
}
}
