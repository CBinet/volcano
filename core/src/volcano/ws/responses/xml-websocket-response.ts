import { WebsocketResponse } from "./websocket-response";
import * as WebSocket from 'ws';
var xml = require('xml');

export class XmlWebsocketResponse extends WebsocketResponse {

    sendWith(server: WebSocket.Server, ws: any) {
        const xmlContent = xml(this.content);
        this.send(server, ws, xmlContent);
    }

}