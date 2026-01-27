import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-delete-task',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.css',
})
export class DeleteTask {

  public dialogRef=inject(MatDialogRef<DeleteTask>);

  onNoClick(){
    this.dialogRef.close(false);
  }
  onYesClick(){
    this.dialogRef.close(true);
  }
}
