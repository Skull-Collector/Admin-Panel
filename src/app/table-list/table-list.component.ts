import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersService } from 'app/services/users.service';
import { UserStatus } from 'app/models/enums/UserStatus.enum';
import { User } from 'app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from 'app/services/notify.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { TasksService } from 'app/services/tasks.service';
import { Task } from 'app/models/task';
import { TaskMode } from 'app/models/task-mode';
import { TaskStatus } from 'app/models/enums/TaskStatus.enum';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableListComponent implements OnInit {

  // declerations ....
  users = new MatTableDataSource<User>();
  tasks = new MatTableDataSource<Task>();
  selected: User;
  selectedTask :Task;
  newTask:Task = {status: 0};
  newUser: User = { status: 0 };


  constructor(public dialog: MatDialog, public updatedialog: MatDialog,
    private usersService: UsersService,
    private tasksService:TasksService, private ntf: NotifyService) {

  }

  ngOnInit() {
    this.refresh();
    
  }

  sortedUsers() {
   return this.users.data.sort((a,b) => a.username.localeCompare(b.username));
  }

  createUser() {
    if (!this.newUser.username) {
      this.ntf.showNotification('top', 'center', 4, 1000,
        `Username is Empty Fix it!`);
      return;
    } else if (!this.newUser.name) {
      this.ntf.showNotification('top', 'center', 4, 1000,
        `Name is Empty Fix it!`);
      return;
    } else if (!this.newUser.password) {
      this.ntf.showNotification('top', 'center', 4, 1000,
        `Password is Empty Fix it!`);
      return;
    } else if (this.newUser.password.length < 8) {
      this.ntf.showNotification('top', 'center', 4, 1000,
        `Password is Too Short Fix it!`);
      return;
    } else {
      this.usersService.createUser(this.newUser).subscribe(res => {
        this.ntf.showNotification('top', 'center', 2, 1000,
          `New User has Been Created \n${res.username} Welcome!`);
        this.newUser = new User();
        this.newUser = { status: 0 };
        this.refresh();

      });
    }
  }

  createTask(){
    this.tasksService.createTask(this.newTask).subscribe(res => {
      this.ntf.showNotification('top', 'center', 2, 1000,
        `New Task has Been Created \n${res.title} `);
      this.newTask = new Task();
      this.newTask = { status: 0 };
      this.refresh();

    });
  }

  OnExpand(user) {
    this.selected = user;

  }

  OnTaskExpand(task) {
    this.selectedTask = task;

  }

  updateUser(id: string) {
    this.usersService.updateUser(id, this.selected).subscribe(c => this.refresh());
    this.ntf.showNotification('top', 'center', 2, 1000,
      `${this.users.data.find(user => user._id === id).username} has Been Updated Successfully!`);

  }

  updateTask(id: string) {
    this.tasksService.updateTask(id, this.selectedTask).subscribe(c => this.refresh());
    this.ntf.showNotification('top', 'center', 2, 1000,
      `${this.tasks.data.find(user => user._id === id).title} Task has Been Updated Successfully!`);

  }


  refresh() {
    //load users
    this.usersService.getAllUsers().subscribe((data: {}) => {
      this.users.data = data as User[];
    });

    //load tasks
    this.tasksService.getAllTasks().subscribe((data: {}) => {
      this.tasks.data = data as Task[];
    });

  }


  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe((data: any) => {
      ;
      this.ntf.showNotification('top', 'center', 2, 1000,
        `${this.tasks.data.find(user => user._id === id).title} Task has Been Deleted Successfully!`);
      this.refresh();
    })

  }



  delete(id: string) {
    this.usersService.deleteUser(id).subscribe((data: any) => {
      ;
      this.ntf.showNotification('top', 'center', 2, 1000,
        `${this.users.data.find(user => user._id === id).username} has Been Deleted Successfully!`);
      this.refresh();
    })

  }

  getStatName(num: number) {
    return UserStatus[num].toString();

  }

  getTaskName(num: number) {
    return this.tasksService.getModeName(num);

  }

  toDate(date: Date) {
    const newDate = new Date(date);
    return newDate.toDateString();
  }

  dateOnly(date: Date) {
    const newDate = new Date(date);
    return `${newDate.getMonth()}/${newDate.getDay()}/${newDate.getFullYear()}`;
  }

}
