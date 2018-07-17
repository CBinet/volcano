import { WebsocketResponse } from "./websocket-response";
import * as WebSocket from 'ws';

export class TextWebsocketResponse extends WebsocketResponse {

    sendWith(server: WebSocket.Server, ws: any) {
        this.send(server, ws, this.content.toString());
    }

}