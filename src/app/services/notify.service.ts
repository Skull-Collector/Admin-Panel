import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  showNotification(from: string, align: string, kind: number, time: number, msg: string) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = kind;

    $.notify({

      tit: type[color].toUpperCase(),
      icon: "notifications",
      message: msg

    }, {
      type: type[color],
      timer: time,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="title" class="text-center" style="font-weight: bold; font-size: 18px; text-transform: capitalize;">{0}</span> ' +
        '<span data-notify="message" class="text-center">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
