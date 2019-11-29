import { Injectable } from '@angular/core';
import { TaskMode } from 'app/models/task-mode';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from 'app/models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  
apiURL = 'http://localhost:5645'
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
public modes: TaskMode[] = [
  { id: 0, message: 'Just Started' },
  { id: 1, message: 'On Progress'},
  { id: 2, message: 'Got Problem'},
  { id: 3, message: 'Almost Done'},
  { id: 4, message: 'Completed'},

];

constructor(private http: HttpClient) { }


getAllTasks(): Observable<Task> {
  return this.http.get<Task>(this.apiURL + '/alltasks').pipe(
    retry(1),
    catchError(this.handleError)
  );
}

getTaskById(id): Observable<Task> {
  return this.http.get<Task>(this.apiURL + '/tasks/' + id).pipe(
    retry(1),
    catchError(this.handleError)
  )
}

createTask(task): Observable<Task> {
  return this.http.post<Task>(this.apiURL + '/task', JSON.stringify(task), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
}

updateTask(id, task): Observable<Task> {
  return this.http.put<Task>(this.apiURL + '/tasks/' + id, JSON.stringify(task), this.httpOptions).pipe(
    retry(1),
    catchError(this.handleError)
  )
}

deleteTask(id) {
  console.log(id);
  return this.http.delete<Task>(this.apiURL + '/tasks/' + id, this.httpOptions).pipe(
    retry(1),
    catchError(this.handleError)
  )
}

getModeName(num: number) {
  return this.modes[num].message

}

// Error handling
handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  // this.ntf.showNotification('top', 'center', 4, 1000,
  //       `${error.message}`);
  return throwError(errorMessage);
}
}
