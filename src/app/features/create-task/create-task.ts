import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewTask } from '../../models/new-task.model';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModal } from '../../shared/error-modal/error-modal';
import { SuccessCreatedTask } from '../../shared/success-created-task/success-created-task';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {

  private userService=inject(UserService);
  private dialog=inject(MatDialog);
  public taskForm=new FormGroup({
    title:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    description:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    date_from:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    }),
    date_to:new FormControl('',{
      nonNullable:true,
      validators:[Validators.required]
    })
  });
  private newTask=signal<NewTask|null>(null);
  constructor(){
    effect(async ()=>{
      try{
        const data=this.newTask();
        if(!data)return;
        const response=await lastValueFrom(this.userService.createTask(data));
      
      if(response==='Successfully created task!'){
        this.dialog.open(SuccessCreatedTask,{
          width:'400px'
        });
        this.newTask.set(null);
        this.taskForm.reset();
      } else {
        this.dialog.open(ErrorModal,{
          width:'400px'
        });
      }
    } catch(error){
      this.dialog.open(ErrorModal,{
        width:'400px'
      });
    }
    })
  }

  onSubmit(){
    if(this.taskForm.invalid)return;
    const newTaskData=this.taskForm.getRawValue();
    const taskData = {
      ...newTaskData,
      date_from: new Date(newTaskData.date_from),
      date_to: new Date(newTaskData.date_to)
    };
    this.newTask.set(taskData);
  }
}
