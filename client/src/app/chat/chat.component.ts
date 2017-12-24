import { Component, OnInit, Input } from '@angular/core';

import { Room } from '../room';
import { Message } from '../message';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // A chat room can be initialized with a room.
  @Input() room: Room;
  messages: Message[];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // Room might not be set yet.
    // See: https://stackoverflow.com/questions/34396684/input-property-is-undefined-in-angular-2s-oninit
    if (this.room) {
      this.chatService.joinRoom(this.room._id);
    }
  }

}
