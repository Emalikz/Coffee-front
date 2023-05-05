import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Login, LoginResponse } from '../types/Login';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  public login(login:Login){
    return this._http.post<LoginResponse>(`${environment.api_url}/auth/login`,login,{
      headers: new HttpHeaders({ "content-type": 'application/json'})
    });
  }
}
