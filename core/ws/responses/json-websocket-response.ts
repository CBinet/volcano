import { WebsocketResponse } from "./websocket-response";
import { Websocket } from "../server/websocket";
import { Server } from "../server/server";

export class JsonWebsocketResponse extends WebsocketResponse {

    sendWith(server: Server, websocket: Websocket) {
        const jsonContent = JSON.stringify(this.content);
        this.send(server, websocket, jsonContent);
    }
}