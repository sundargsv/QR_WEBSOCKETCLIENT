import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket/websocket.service';

const WEBSOCKET_PROD_URL = '';
const WEBSOCKET_STAGING_URL = 'ws://echo.websocket.org/';

export interface Message {
	websocketId: string,
  authenticated: boolean,
  accessToken?: string,
  sender: string
}

@Injectable()
export class MainService {

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    // console.log('Im in main service');

		this.messages = <Subject<Message>>wsService
			.connect(WEBSOCKET_PROD_URL)
			.map((response: MessageEvent): Message => {
        console.log('Response success');
        let data = JSON.parse(response.data);
        // MARK : The below is the dummpy values
        // assigned for testing the response
        if(!data.accessToken){
          data.accessToken = "";
        }
				return {
					websocketId: data.websocketId,
          authenticated: data.authenticated,
          accessToken: data.accessToken,
          sender: data.sender
				}
			});
	}


}
