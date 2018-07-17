import * as WebSocket from 'ws';

export abstract class WebsocketResponse {
    constructor(public content: any, public broadcast: boolean = false) {}

    abstract sendWith(server: WebSocket.Server, ws);

    protected send(server, ws, content: any): void {
        if (this.broadcast) {
            server.clients.forEach(client => client.send(content))
        } else {
            ws.send(content);
        }
    }
}