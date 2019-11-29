import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'app/services/notify.service';
import { Router } from '@angular/router';
import { UsersService } from 'app/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'app/models/user';
import { LoginInfo } from 'app/models/login-info';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo = new LoginInfo();

  users: User[] = [];

  constructor(private cookieService: CookieService , private notfiys: NotifyService, private authService: AuthService ,
    private router: Router) { }

  ngOnInit() {
  }
  // private loadUsers() {
  //   this.usersService.getAllUsers().subscribe((data: {}) => {
  //     this.users = data as User[];
  //   })
  // }

  onLogin() {
   this.authService.loginUser(this.loginInfo).subscribe(
     res =>{
       console.log(res);
          localStorage.setItem('token',res.token);
          this.router.navigate(['dashboard']);
      this.notfiys.showNotification('top', 'center', 2, 1000,
      `Welcome to Admin Panel!`);
     },
     error =>{
      //  console.log();
      this.notfiys.showNotification('top', 'center', 4, 1000,
      `Error: ${error.statusText}\n\n Invalid Username or Password!`);
     }
   )

  }




}


