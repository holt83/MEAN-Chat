import { Component, OnInit } from '@angular/core';

import { ChatService } from './chat.service';
import { Room } from './room';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MEAN Chat';

  // For temporary hardcoded single-room chat.
  room: Room;
  private roomId = '5a3af014a5d963249d21ab4b';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getRoom();
  }

  getRoom(): void {
    this.chatService.getRoom(this.roomId).subscribe(room => this.room = room);
  }
}
