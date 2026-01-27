import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./features/login/login";
import { ProfileLayout } from "./layouts/profile-layout/profile-layout";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, ProfileLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('clientr');
}
