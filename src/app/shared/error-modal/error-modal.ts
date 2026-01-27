import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  imports: [MatDialogModule],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css',
})
export class ErrorModal {

  private dialogRef=inject(MatDialogRef<ErrorModal>);
}
