import { Component, inject, signal, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // Dodaj ovo
import { MatDatepickerModule } from '@angular/material/datepicker'; // Dodaj ovo
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; // Dodaj ovo
import { FormsModule } from '@angular/forms';
import { TaskModel } from '../../models/task.model'
import { Status } from '../../models/status.enum';
@Component({
  selector: 'app-edit-task',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSelectModule, MatDatepickerModule, 
    MatNativeDateModule, FormsModule
  ],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask {

  public taskCopy;
  public statuses=[
    { value: Status.to_do, label: 'Planirano' },
    { value: Status.in_progress, label: 'U toku' },
    { value: Status.finished, label: 'Završeno' }
  ]
  constructor(public dialogRef:MatDialogRef<EditTask>, @Inject(MAT_DIALOG_DATA) public data:TaskModel){
    this.taskCopy=signal<TaskModel>({...this.data});
  }
  onCancel() { this.dialogRef.close(); }
  onSave() { this.dialogRef.close(this.taskCopy()); }
}
