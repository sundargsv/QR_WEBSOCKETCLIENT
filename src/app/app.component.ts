import { Component } from '@angular/core';
import { log } from 'util';
import { WebsocketService } from './services/websocket/websocket.service';
import { MainService } from './services/main/main.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, MainService ]
})
export class AppComponent {
  title = 'app';
  // Setting defaults for QRCode generation
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'http://www.sundargsv.me';
  webSocketId_added: boolean = false;
  constructor(private mainService: MainService) {
    mainService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg.websocketId);
      this.value = msg.websocketId;
      this.webSocketId_added = msg.authenticated;

    });
  }

  private message = {
    websocketId: '',
    authenticated: false,
    sender: '',
    index: 0
  }

  // @param
  // @description this send msg feature isn't required as of now
  //
  sendMsg() {
		console.log('new message from client to websocket: ', this.message);
		this.mainService.messages.next(this.message);
		this.message.websocketId = 'Hello, pls connect me';
  }

}
