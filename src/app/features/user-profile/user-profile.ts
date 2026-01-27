import { Component, effect, inject, signal } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  public userInfo=signal<UserModel|null>(null);
  private userService=inject(UserService);
  constructor(){
    effect(async ()=>{
      const response=await lastValueFrom(this.userService.getUserInfo());
      console.log('response');
      this.userInfo.set(response);
    })
  }
}
