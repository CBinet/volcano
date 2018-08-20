import { WebsocketResponse } from "./websocket-response";
import { Websocket } from "../server/websocket";
import { Server } from "../server/server";
export declare class JsonWebsocketResponse extends WebsocketResponse {
    sendWith(server: Server, websocket: Websocket): void;
}
