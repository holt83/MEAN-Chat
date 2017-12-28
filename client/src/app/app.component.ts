import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MEAN Chat';

  // Currently logged-in user.
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // The user service maintains an object reference to the currently logged-in user.
    this.user = this.userService.user;
  }
}
