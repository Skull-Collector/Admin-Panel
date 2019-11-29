import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TasksService } from 'app/services/tasks.service';

@Component({
  selector: 'app-task-dialog-info',
  templateUrl: './task-dialog-info.component.html',
  styleUrls: ['./task-dialog-info.component.scss']
})
export class TaskDialogInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private tskService:TasksService) { }

  ngOnInit() {
    
  }

dateToString(date:any){
  const newDate = new Date(date);
  return newDate.toDateString();
}

  getStatName(num: number){
    
    return this.tskService.getModeName(num);
  }

}
