import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  // The currently logged in user.
  user: User = new User();

  // Internal flag to manage whether a user is authenticated.
  private isAuthenticated: boolean = false;
  private usersUrl: string = 'api/users';

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.isAuthenticated && !!this.user;
  }

  authenticate(user: User): Observable<User> {
    const authenticateUrl = this.usersUrl + '/' + 'authenticate';

    return this.http.post<User>(authenticateUrl, user, httpOptions).pipe(
      tap((result) => {
        if (!result) {
          console.log("User or password not found");

          // Since we don't have a register form in this development version,
          // we just create a new user automatically and authenticate it, if
          // the authentication failed.
          // This should be removed and proper feedback should be provided.
          this.addUser(user).subscribe((newUser) => {
            if (newUser) {
              console.log("Automatically created new user with id: " + newUser._id);
              this.authenticateUser(newUser);
            }
          });
        }
        else {
          // User was found and password matched.
          this.authenticateUser(result);
        }
      }),
      catchError(this.handleError<User>("Failed to authenticate user: " + user.username))
    );
  }

  private authenticateUser(user: User): void {
    this.user._id = user._id;
    this.user.username = user.username;
    this.user.created = user.created;
    this.isAuthenticated = true;
    console.log("User " + user.username + " was authenticated!");
  }

  unAuthenticateUser(): void {
    delete this.user._id;
    delete this.user.username;
    delete this.user.created;
    this.isAuthenticated = false;
    console.log("User was unauthenticated!");
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap(user => console.log("Added new user with id: " + user._id)),
      catchError(this.handleError<User>("addUser failed"))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // log to console instead
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
