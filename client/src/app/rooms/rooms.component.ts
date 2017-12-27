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
    this.chatService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

  joinRoom(room: Room): void {
    this.currentRoom = room;
  }

  leaveRoom(): void {
    this.currentRoom = null;
  }
}
