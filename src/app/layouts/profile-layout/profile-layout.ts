import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-profile-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile-layout.html',
  styleUrl: './profile-layout.css',
})
export class ProfileLayout {

  private router=inject(Router);
  handleLogout(){
    localStorage.removeItem('tkn');
    this.router.navigateByUrl('login');
  }
}
