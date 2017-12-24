import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  login(user: string): void {
    this.userService.setUser(user);
    this.user = user;
  }

  logout(): void {
    this.user = null;
  }

}
