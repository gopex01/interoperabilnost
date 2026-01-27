import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoint } from '../core/endpoints';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { NewUser } from '../models/new-user.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../models/jwt.payload';
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private apiUrl=EndPoint.login;
  private apiRegisterUrl=EndPoint.register;
  httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
  })
  constructor(private httpClient:HttpClient){}

  login(loginData:LoginModel):Observable<any>{
    return this.httpClient.post(this.apiUrl,loginData,{headers:this.httpHeaders});
  }

  register(newUser:NewUser):Observable<any>{
    return this.httpClient.post(this.apiRegisterUrl,newUser,{headers:this.httpHeaders,responseType:'text'});
  }
  public decodeToken(token:string):JwtPayload|null{
    try{
      return jwtDecode<JwtPayload>(token);
    }catch{
      return null;
    }
  }
}
