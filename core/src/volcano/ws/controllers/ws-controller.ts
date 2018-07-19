import * as WebSocket from 'ws';
import { WebsocketResponse } from '../responses/websocket-response';

export abstract class WsController {
    constructor(public route?: string) {}

    abstract onConnect(websocket: WebSocket, server: WebSocket.Server) : WebsocketResponse;

    abstract onDisconnect(websocket: WebSocket, server: WebSocket.Server) : WebsocketResponse;
}   