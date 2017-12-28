import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Room } from '../room';
import { Message } from '../message';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  // A chat room can be initialized with a room.
  @Input() room: Room;
  // The messages in the current room.
  messages: Message[];
  private subscription;

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Always connect to the socket on init.
    // The stream of messages will first begin when we join a room.
    this.subscription = this.chatService.connect().subscribe(
      messages => this.messages = messages,
      error => console.log(error)
    );

    // The room was passed in as an Input property.
    if (this.room) {
      // Get latest messages manually first.
      this.chatService.getMessages(this.room._id).subscribe(messages => {
        this.messages = messages;
        // Join the room to receive live updates of messages.
        this.chatService.joinRoom(this.room._id);
      });
    }
  }

  addMessage(message: string): void {
    const name: string = this.userService.user.username;
    message = message.trim();
    // Need a user and message to create post.
    // TODO: Better error handling/feedback about this.
    if (!name || !message) return;
    const roomId: string = this.room._id;
    // The messages will be updated via the socket "new message" event, so we
    // have nothing to do in subcibe. Need to call it anyway.
    this.chatService.addMessage({roomId, name, message} as Message).subscribe();
  }

  ngOnDestroy() {
    // This will also disconnect the socket.
    this.subscription.unsubscribe();
  }

}
