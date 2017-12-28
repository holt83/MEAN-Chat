import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('rooms');
    }
  }

  logIn(username: string, password: string): void {
    username = username.trim();
    password = password.trim();

    if (!username || !password) return;

    const user: User = { username, password } as User;

    this.userService.authenticate(user).subscribe(
      user => {
        // In this development version the user will be crated/authenticated automatically.
        // Otherwise it would be necessary to check user variable before redirect.
        this.router.navigateByUrl('rooms');
      },
      error => {
        // Username and/or password wasn't found in db.
        // Inform user about this.
      }
    );
  }

}
