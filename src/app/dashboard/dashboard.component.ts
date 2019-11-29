import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { TasksService } from 'app/services/tasks.service';
import { UsersService } from 'app/services/users.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Task } from 'app/models/task';
import { User } from 'app/models/user';
import { TaskDialogInfoComponent } from 'app/components/task-dialog-info/task-dialog-info.component';
import { NotifyService } from 'app/services/notify.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserStatus } from 'app/models/enums/UserStatus.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  //decleraions 

  users = new MatTableDataSource<User>();
  tasks = new MatTableDataSource<Task>();

  constructor(private usersService: UsersService,
    private tasksService: TasksService, public taskDetailsDialog: MatDialog, private ntf: NotifyService) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    this.refresh();
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [100, 17, 7, 17, 23, 18, 38]
      ]
    };
    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
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
  
  getStatName(num: number) {
    return UserStatus[num].toString();

  }

  openInfoDialog(task: Task) {
    this.taskDetailsDialog.open(TaskDialogInfoComponent, { width: '500px', data: task });
  }

  now(){
    return new Date().toDateString();
  }

  sortedUsers() {
    return this.users.data.sort((a,b) => a.joindate.localeCompare(b.joindate));
   }


  completeTask(id: string) {
    const updated = this.tasks.data.find(task => task._id === id)
    updated.status = 4;
    this.tasksService.updateTask(id,updated).subscribe(res => {
      this.ntf.showNotification('top', 'center', 2, 1000,
      `${updated.title} Task has Completed Successfully!`);
    this.ngOnInit();
    });
  }

  dateString(date:Date){
    const d= new Date(date);
    return d.toDateString();
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe(
      res => {

        this.ntf.showNotification('top', 'center', 2, 1000,
          `Task has Deleted Successfully!`);
        this.ngOnInit();
      }
    );


  }








}
