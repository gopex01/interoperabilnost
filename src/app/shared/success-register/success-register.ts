import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-register',
  imports: [MatDialogModule],
  templateUrl: './success-register.html',
  styleUrl: './success-register.css',
})
export class SuccessRegister {

  private dialogRef=inject(MatDialogRef<SuccessRegister>);
}
