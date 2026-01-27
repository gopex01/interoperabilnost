import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-created-task',
  imports: [MatDialogModule],
  templateUrl: './success-created-task.html',
  styleUrl: './success-created-task.css',
})
export class SuccessCreatedTask {

  private dialogRef=inject(MatDialogRef<SuccessCreatedTask>);
}
