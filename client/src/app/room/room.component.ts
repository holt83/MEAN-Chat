import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
import { Room } from '../room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room;

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  addRoom(title: string, description: string): void {
    const creator: string = this.userService.getUser();
    title = title.trim();
    description = description.trim();
    // TODO: Better error handling/feedback about this.
    if (!creator || !title || !description) return;
    this.chatService.addRoom({ title, description, creator } as Room).subscribe(
      room => this.room = room
    );
  }

}
