import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModal } from '../../shared/error-modal/error-modal';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone:true,
})
export class Login {


  private loginService=inject(LoginService);
  private router=inject(Router);
  private dialog=inject(MatDialog);
  isLoading=signal(false);
  errorMessage=signal<string|null>(null);
  loginForm=new FormGroup({
    username:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    password:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    })
  });

  buttonText=computed(()=>this.isLoading()?'Prijava u toku...':'Prijavi se');
  private credentialsToLogin=signal<LoginModel|null>(null);
  constructor(){
    effect(async ()=>{
      const data=this.credentialsToLogin();
      if(!data)return;
      try{
        const response=await lastValueFrom(this.loginService.login(data));
        this.isLoading.set(false);
        localStorage.setItem('tkn',response.access_token);
        this.router.navigateByUrl('/profile');
      }catch(err){
        this.isLoading.set(false);
        this.errorMessage.set('Neispravni podaci');
        this.credentialsToLogin.set(null);
        this.dialog.open(ErrorModal,{
          width:'400px'
        });
      }
    })
  }

  onSubmit(){
    if(this.loginForm.invalid)return;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const loginData=this.loginForm.getRawValue();
    this.credentialsToLogin.set(loginData);
  }

}
