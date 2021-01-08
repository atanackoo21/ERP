import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IStatus } from '../interfaces/status';
import { error } from '@angular/compiler/src/util';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { ILogin } from '../interfaces/login';
import { DOCUMENT } from '@angular/common';

const local_url = "http://localhost:8085/api/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,@Inject(DOCUMENT) private document: Document) { }

  login(data: any): Observable<ILogin>{
    return this.http.post<ILogin>(local_url, data); 
  }

  logOut(){
    window.localStorage.setItem("token", null);
    window.localStorage.setItem("user", null);
    this.document.location.href = 'http://localhost:4200/land';
  }

  setUserAndToken(token, role){
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("user", role);
  }

  getUser(){
    return window.localStorage.getItem("user");
  }

  getToken(){
    return window.localStorage.getItem("token");
  }

}