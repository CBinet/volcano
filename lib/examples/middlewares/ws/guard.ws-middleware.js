"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_injection_module_1 = require("../../../core/injection/volcano-injection.module");
const volcano_ws_module_1 = require("../../../core/ws/volcano-ws.module");
const chat_service_1 = require("../../services/chat.service");
class Guard extends volcano_ws_module_1.WsMiddleware {
    intercept(message, websocket, server) {
        let sessionIdIsValid = this.sessionIdIsValid(message);
        if (sessionIdIsValid) {
            return true;
        }
        else {
            const response = new volcano_ws_module_1.JsonWebsocketResponse({ error: 'Unauthorized access' });
            response.sendWith(server, websocket);
            return false;
        }
    }
    sessionIdIsValid(message) {
        let sessionIdIsValid = false;
        if (message.headers && message.headers.authorization) {
            sessionIdIsValid = this.chatService.sessionIdIsValid(message.headers.authorization);
        }
        return sessionIdIsValid;
    }
}
__decorate([
    volcano_injection_module_1.Inject(chat_service_1.ChatService)
], Guard.prototype, "chatService", void 0);
exports.Guard = Guard;
//# sourceMappingURL=guard.ws-middleware.js.map