import { Component, OnInit } from '@angular/core';

import { Room } from '../room';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[];
  currentRoom: Room;
  enabledPanels: string[];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getRooms();
    this.enabledPanels = [];
  }

  getRooms(): void {
    this.chatService.getRooms().subscribe(
      rooms => this.rooms = rooms
    );
  }

  joinRoom(room: Room): void {
    if (this.currentRoom) {
      this.currentRoom = null;
    }
    this.currentRoom = room;
  }

  leaveCurrentRoom(): void {
    this.currentRoom = null;
  }

  panelChange(): void {
    // Doing this here enables automatic leaving of current selected chat room.
    this.currentRoom = null;
  }
}
