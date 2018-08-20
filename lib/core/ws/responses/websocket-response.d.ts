import { Server } from '../server/server';
import { Websocket } from '../server/websocket';
export declare abstract class WebsocketResponse {
    content: any;
    broadcast: boolean;
    receivers?: Websocket[];
    constructor(content: any, broadcast?: boolean, receivers?: Websocket[]);
    abstract sendWith(server: Server, websocket: Websocket): any;
    protected send(server: Server, websocket: Websocket, content: any): void;
}
