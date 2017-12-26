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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoomsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [ChatService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
