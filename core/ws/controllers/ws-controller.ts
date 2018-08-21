import { WebsocketResponse } from '../responses/websocket-response';
import { Server } from '../server/server';
import { Websocket } from '../server/websocket';

export abstract class WsController {
    constructor(public route?: string) {}

    abstract async onConnect(websocket: Websocket, server: Server) : Promise<WebsocketResponse>;

    abstract async onDisconnect(websocket: Websocket, server: Server) : Promise<WebsocketResponse>;
}   