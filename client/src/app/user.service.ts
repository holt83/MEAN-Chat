import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  // The name of the currently logged in user.
  private user: string;

  constructor() { }

  login(user: string): void {
    user = user.trim();
    if (!user) { return; }
    this.user = user;
  }

  loggedIn(): boolean {
    return !!this.user;
  }

}
