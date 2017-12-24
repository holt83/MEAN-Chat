import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  // The name of the currently logged in user.
  private user: string;

  constructor() { }

  setUser(user: string) {
    this.user = user;
  }

  getUser(): string {
    return this.user;
  }

}
