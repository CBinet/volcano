import { WebsocketResponse } from "./websocket-response";
import * as WebSocket from 'ws';

export class JsonWebsocketResponse extends WebsocketResponse {

    sendWith(server: WebSocket.Server, ws: any) {
        const jsonContent = JSON.stringify(this.content);
        this.send(server, ws, jsonContent);
    }
}