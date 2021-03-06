import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { UserService } from './user.service';
import { UserComponent } from './user/user.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ChatComponent } from './chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { RoomComponent } from './room/room.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoomsComponent,
    ChatComponent,
    RoomComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(), // NG Boostrap
    AppRoutingModule
  ],
  providers: [ChatService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
