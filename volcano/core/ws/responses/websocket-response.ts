import { Server } from '../server/server';
import { Websocket } from '../server/websocket';

export abstract class WebsocketResponse {
    
    constructor(public content: any, public broadcast: boolean = false, public receivers?: Websocket[]) {}

    abstract sendWith(server: Server, websocket: Websocket);

    protected send(server: Server, websocket: Websocket, content: any): void {
        if (this.broadcast) {
            server.clients.forEach(client => client.send(content))
        } else {
            if (this.receivers && this.receivers.length > 0) {
                this.receivers.forEach(client => client.send(content));
            } else {
                websocket.send(content);
            }
        }
    }
}