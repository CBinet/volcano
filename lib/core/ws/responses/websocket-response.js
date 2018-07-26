"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebsocketResponse {
    constructor(content, broadcast = false, receivers) {
        this.content = content;
        this.broadcast = broadcast;
        this.receivers = receivers;
    }
    send(server, websocket, content) {
        if (this.broadcast) {
            server.clients.forEach(client => client.send(content));
        }
        else {
            if (this.receivers && this.receivers.length > 0) {
                this.receivers.forEach(client => client.send(content));
            }
            else {
                websocket.send(content);
            }
        }
    }
}
exports.WebsocketResponse = WebsocketResponse;
//# sourceMappingURL=websocket-response.js.map