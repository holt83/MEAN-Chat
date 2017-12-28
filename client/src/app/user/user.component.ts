import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  logOut(): void {
    this.userService.unAuthenticateUser();
    this.router.navigateByUrl('login');
  }

  logIn(): void {
    this.router.navigateByUrl('login');
  }

}
