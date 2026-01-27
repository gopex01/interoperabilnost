import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EndPoint } from '../core/endpoints';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { JwtPayload } from 'jwt-decode';
import { TaskModel } from '../models/task.model';
import { NewTask } from '../models/new-task.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private authToken=localStorage.getItem('tkn');
  private username:string|undefined;
  private userId:number|undefined;
  private apiUrl=EndPoint.userEndpoints;
  private taskApiUrl=EndPoint.taskEndpoints;
  private httpClient:HttpClient=inject(HttpClient);
  private loginService=inject(LoginService);
  private httpHeaders:HttpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    'Bearer-Token':`${this.authToken}`
  });
  constructor(){
    if(!this.authToken){
      console.error('iNVALID TOKEN');
    } else {
      let decodedToken=this.loginService.decodeToken(this.authToken);
      this.username=decodedToken?.username;
      this.userId=decodedToken?.sub;
    }
  }

  public getUserInfo():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}getUserByUsername/${this.username}`,{headers:this.httpHeaders});
  }

  public getAllTasks():Observable<any>{
    return this.httpClient.get(`${this.taskApiUrl}getAllUserTasks/${this.userId}`,{headers:this.httpHeaders});
  }

  public updateTask(task:TaskModel | null):Observable<any>{
    return this.httpClient.patch(`${this.taskApiUrl}updateTask/${task?.id}`,task,{headers:this.httpHeaders, responseType:'text'});
  }

  public deleteTask(task:TaskModel|null):Observable<any>{
    return this.httpClient.delete(`${this.taskApiUrl}deleteTask/${task?.id}`,{headers:this.httpHeaders,responseType:'text'});
  }

  public createTask(task:NewTask|null):Observable<any>{
    return this.httpClient.post(`${this.taskApiUrl}createTask/${this.userId}`,task,{headers:this.httpHeaders,responseType:'text'});
  }
}
