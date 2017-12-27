import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';

import { Message } from './message';
import { Room } from './room';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChatService {

  private socketUrl = window.location.origin;
  private roomsUrl = 'api/rooms';
  private messagesUrl = 'api/messages';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.socketUrl);
  }

  joinRoom(roomId: string): void {
    this.socket.emit('join room', roomId);
  }

  connectMessages(): Observable<Message[]> {
    return Rx.Observable.create(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      // Nothing to do on unsubscribe.
    });
  }

  getRoom(roomId: string): Observable<Room> {
    const url = this.roomsUrl + '/' + roomId;

    return this.http.get<Room>(url).pipe(
      tap(_ => console.log('Fetched room with id: ' + roomId)),
      catchError(this.handleError<Room>('getRoom id:' + roomId))
    );
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl).pipe(
      tap(_ => console.log('Fetched rooms')),
      catchError(this.handleError<Room[]>('getRooms failed'))
    );
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room, httpOptions).pipe(
      tap(_ => console.log("Added new message")),
      catchError(this.handleError<Room>("addMessage failed"))
    );
  }

  getMessages(roomId: string): Observable<Message[]> {
    const url = this.messagesUrl + '/' + roomId;

    return this.http.get<Message[]>(url).pipe(
      tap(messages => console.log('Fetched messages')),
      catchError(this.handleError('getMessages roomId: ' + roomId, []))
    );
  }

  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.messagesUrl, message, httpOptions).pipe(
      tap(_ => console.log("Added new message")),
      catchError(this.handleError<Message>("addMessage failed"))
    );
  }

  // TODO: Can we do at better job here?
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // log to console instead
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
