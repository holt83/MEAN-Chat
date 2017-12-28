import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getRoom();
  }

  getRoom() {
    const roomId: string = this.route.snapshot.paramMap.get('roomId');

    // This component supports being initialized with a roomId router
    // parameter, but might not be.
    if (!roomId) return;

    this.chatService.getRoom(roomId).subscribe(
      room => this.room = room
    );
  }

  addRoom(title: string, description: string): void {
    const creator: string = this.userService.user.username;
    title = title.trim();
    description = description.trim();

    if (!creator || !title || !description) return;

    this.chatService.addRoom({ title, description, creator } as Room).subscribe(
      () => this.goBack()
    );
  }

  updateRoom(title: string, description: string): void {
    const creator: string = this.userService.user.username;
    title = title.trim();
    description = description.trim();

    if (!creator || !title || !description || !this.room) return;

    // Could have used a two-way binding to avoid this manual update.
    this.room.title = title;
    this.room.description = description;
    this.chatService.updateRoom(this.room).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
