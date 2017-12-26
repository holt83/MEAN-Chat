import { Component, OnInit, Input } from '@angular/core';

import { Room } from '../room';
import { Message } from '../message';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // A chat room can be initialized with a room.
  @Input() room: Room;
  // The messages in the current room.
  messages: Message[];
  // The current message being entered.
  message: Message;

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Room might not be set yet.
    // See: https://stackoverflow.com/questions/34396684/input-property-is-undefined-in-angular-2s-oninit
    if (this.room) {
      this.chatService.getMessages(this.room._id).subscribe(messages => {
        this.messages = messages;

        // The chat now contains the latest messages; subscribe to the stream
        // of message updates provided by the chat service.
        this.chatService.joinRoom(this.room._id);
        this.chatService.connectMessages().subscribe(
          messages => this.messages = messages,
          error => console.log(error)
        );
      });
    }
  }

  addMessage(message: string): void {
    const name: string = this.userService.getUser();
    message = message.trim();
    // Need a user and message to create post.
    // TODO: Better error handling/feedback about this.
    if (!name || !message) return;
    const roomId: string = this.room._id;
    // The messages will be updated via the socket "new message" event, so we
    // have nothing to do in subcibe. Need to call it anyway.
    this.chatService.addMessage({roomId, name, message} as Message).subscribe();
  }

}
