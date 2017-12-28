import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room/room.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent },
  { path: 'rooms/new', component: RoomComponent },
  { path: 'rooms/:roomId', component: RoomComponent },
  { path: 'login', component:  UserLoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
