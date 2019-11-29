import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { retry, map, filter, catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL = 'http://localhost:5645'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  }
  constructor(private authService:AuthService, private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  getAllUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/allusers', this.httpOptions);
  }


  getUserById(id): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users/' + id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createUser(user): Observable<User> {
    return this.http.post<User>(this.apiURL + '/user', JSON.stringify(user), this.httpOptions)
      // .pipe(
      //   retry(1),
      //   catchError(this.handleError)
      // )
  }

  updateUser(id, user): Observable<User> {
    return this.http.put<User>(this.apiURL + '/users/' + id, JSON.stringify(user), this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteUser(id) {
    console.log(id);
    return this.http.delete<User>(this.apiURL + '/users/' + id, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  logOut() {
    this.cookieService.delete('UserSession')
    this.router.navigate(['/login']);
  }


}
