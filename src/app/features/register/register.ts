import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewUser } from '../../models/new-user.model';
import { lastValueFrom } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ErrorModal } from '../../shared/error-modal/error-modal';
import { SuccessRegister } from '../../shared/success-register/success-register';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone:true,
})
export class Register {

  private loginService=inject(LoginService);
  private dialog=inject(MatDialog);
  public router=inject(Router);
  isLoading=signal(false);
  errorMessage=signal<string|null>(null);
  registerForm=new FormGroup({
    username:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    password:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    firstName:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    lastName:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    phoneNumber:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    })
  });
  
  private newUser=signal<NewUser|null>(null);
  constructor(){
    effect(async ()=>{
      const data=this.newUser();
      if(!data) return;
      try{
        const response=await lastValueFrom(this.loginService.register(data));
        if(response==='Successfully created user'){
          this.isLoading.set(false);
          const dialogRef=this.dialog.open(SuccessRegister,{
            width:'400px'
          });
          dialogRef.afterClosed().subscribe(()=>{
            this.router.navigateByUrl('/login');
          })
        }
      }catch(err){
        this.isLoading.set(false);
        this.errorMessage.set('Neispravni podaci');
        this.newUser.set(null);
        this.dialog.open(ErrorModal,{
          width:'400px'
        });
      }
    })
  }

  onSubmit(){
    if(this.registerForm.invalid)return;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const newUserData=this.registerForm.getRawValue();
    this.newUser.set(newUserData);
  }
}
