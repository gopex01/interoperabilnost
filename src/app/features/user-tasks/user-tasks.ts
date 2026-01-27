import { Component, computed, effect, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TaskModel } from '../../models/task.model';
import { lastValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditTask } from '../../shared/edit-task/edit-task';
import { DeleteTask } from '../../shared/delete-task/delete-task';

@Component({
  selector: 'app-user-tasks',
  imports: [DatePipe],
  templateUrl: './user-tasks.html',
  styleUrl: './user-tasks.css',
})
export class UserTasks {

  private userService=inject(UserService);
  private dialog=inject(MatDialog);
  public allTasks=signal<TaskModel[]|null>(null);
  public userTasks=signal<TaskModel[]|null>(null);
  public selectedTask=signal<TaskModel|null>(null);
  public taskForDelete=signal<TaskModel|null>(null);

  public currentPage=signal(1);
  public pageSize=9;
  constructor(){
    effect(async ()=>{
      const response=await lastValueFrom(this.userService.getAllTasks());
      this.allTasks.set(response);
      this.userTasks.set(response);
    });

    effect(async ()=>{
      if(this.selectedTask()!==null && this.selectedTask()!==undefined){
      const response=await lastValueFrom(this.userService.updateTask(this.selectedTask()));
      if(response==='Successfully updated task!'){
        const currentTasks=this.allTasks();
        if(currentTasks && this.selectedTask()){
        const index=currentTasks?.findIndex(task=>task.id===this.selectedTask()?.id);
        if(index!==-1){
          const updatedArray=[...currentTasks];
          updatedArray[index]=this.selectedTask()!;
          this.allTasks.set(updatedArray);
          this.userTasks.set(updatedArray);
          this.selectedTask.set(null);
        }
      }
    }
      
      }
    });
    effect(async ()=>{
      if(this.taskForDelete()!==null && this.taskForDelete!==undefined){
        const response=await lastValueFrom(this.userService.deleteTask(this.taskForDelete()));
        if(response==='Task is succesfully deleted!'){
           const currentTasks=this.allTasks();
        if(currentTasks && this.taskForDelete()){
        const index=currentTasks?.findIndex(task=>task.id===this.taskForDelete()?.id);
        if(index!==-1){
          const updatedArray=[...currentTasks];
          updatedArray.splice(index,1);
          this.allTasks.set(updatedArray);
          this.userTasks.set(updatedArray);
          this.taskForDelete.set(null);
        }
      }
        }
      }
    })
  }

  public onFilterChange(year:string,month:string){
    const y=parseInt(year);
    const m=parseInt(month);

    const filtered=this.allTasks()?.filter(task=>{
      const taskDate=new Date(task.date_from!);
      return taskDate.getFullYear()===y && taskDate.getMonth()===m;
    });
    this.userTasks.set(filtered!);
  }

  public resetFilter(){
    this.userTasks.set(this.allTasks());
  }

  public editTask(task:TaskModel){
    const dialogRef=this.dialog.open(EditTask,{
      width:'400px',
      data:task,
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.selectedTask.set(result);
      }
    })
  }
  public deleteTask(task:TaskModel){
    const dialogRef=this.dialog.open(DeleteTask,{
      width:'400px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.taskForDelete.set(task);
      }
    })
  }
  public pagedTasks = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    if(this.userTasks()!==null && this.userTasks!==undefined){
    return this.userTasks()!.slice(startIndex, startIndex + this.pageSize);
    } else {
      return null;
    }
  });

  // Izračunavamo ukupan broj stranica
  public totalPages = computed(() => 
    Math.ceil(this.userTasks()!.length / this.pageSize)
  );

  // Funkcija za promenu stranice
  setPage(page: number) {
    this.currentPage.set(page);
    // Opciono: skroluj na vrh kada promeniš stranu
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Funkcija za reset filtera (mora resetovati i stranicu)
  resetFilterPag() {
    this.currentPage.set(1);
    // ... tvoja logika za reset
  }
}
