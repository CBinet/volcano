import { WebsocketResponse } from '../responses/websocket-response';
import { Server } from '../server/server';
import { Websocket } from '../server/websocket';
export declare abstract class WsController {
    route?: string;
    constructor(route?: string);
    abstract onConnect(websocket: Websocket, server: Server): WebsocketResponse;
    abstract onDisconnect(websocket: Websocket, server: Server): WebsocketResponse;
}
