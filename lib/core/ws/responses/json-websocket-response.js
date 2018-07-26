"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_response_1 = require("./websocket-response");
class JsonWebsocketResponse extends websocket_response_1.WebsocketResponse {
    sendWith(server, websocket) {
        const jsonContent = JSON.stringify(this.content);
        this.send(server, websocket, jsonContent);
    }
}
exports.JsonWebsocketResponse = JsonWebsocketResponse;
//# sourceMappingURL=json-websocket-response.js.map