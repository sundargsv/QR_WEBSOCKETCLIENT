import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket/websocket.service';

const WEBSOCKET_PROD_URL = 'ws://phx-uim-platform-master.ctnr.ctl.io/uim/websocket/authenticate';
const WEBSOCKET_STAGING_URL = 'ws://echo.websocket.org/';

export interface Message {
	websocketId: string,
  authenticated: boolean,
  sender: string,
  index: number
}

@Injectable()
export class MainService {

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    // console.log('Im in main service');

		this.messages = <Subject<Message>>wsService
			.connect(WEBSOCKET_STAGING_URL)
			.map((response: MessageEvent): Message => {
        console.log('Response success');
        let data = JSON.parse(response.data);
        // MARK : The below is the dummpy values
        // assigned for testing the response
        data.websocketId = '5a35f7147d5cd03e60987c33';
        data.authenticated = true;
				return {
					websocketId: data.websocketId,
          authenticated: data.authenticated,
          sender: data.sender,
          index: data.index
				}
			});
	}


}
