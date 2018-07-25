import { WebsocketResponse } from "./websocket-response";
import { Server } from "../server/server";
import { Websocket } from "../server/websocket";
var xml = require('xml');

export class XmlWebsocketResponse extends WebsocketResponse {

    sendWith(server: Server, websocket: Websocket) {
        const xmlContent = xml(this.content);
        this.send(server, websocket, xmlContent);
    }

}