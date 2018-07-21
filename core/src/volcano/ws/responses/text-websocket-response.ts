import { Server } from '../server/server';
import { Websocket } from '../server/websocket';
import { WebsocketResponse } from './websocket-response';

export class TextWebsocketResponse extends WebsocketResponse {

    sendWith(server: Server, websocket: Websocket) {
        this.send(server, websocket, this.content.toString());
    }

}