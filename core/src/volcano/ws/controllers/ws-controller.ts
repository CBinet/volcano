import { WebsocketResponse } from '../responses/websocket-response';
import { Server } from '../server/server';
import { Websocket } from '../server/websocket';

export abstract class WsController {
    constructor(public route?: string) {}

    abstract onConnect(websocket: Websocket, server: Server) : WebsocketResponse;

    abstract onDisconnect(websocket: Websocket, server: Server) : WebsocketResponse;
}   