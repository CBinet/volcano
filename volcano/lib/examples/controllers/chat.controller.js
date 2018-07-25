"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_http_module_1 = require("../../core/http/volcano-http.module");
const volcano_injection_module_1 = require("../../core/injection/volcano-injection.module");
const volcano_ws_module_1 = require("../../core/ws/volcano-ws.module");
const guard_ws_middleware_1 = require("../middlewares/ws/guard.ws-middleware");
const logger_ws_middleware_1 = require("../middlewares/ws/logger.ws-middleware");
const chat_service_1 = require("../services/chat.service");
let ChatController = class ChatController extends volcano_ws_module_1.WsController {
    onConnect(websocket, server) {
        const sessionId = this.chatService.setOnline(websocket);
        return new volcano_ws_module_1.JsonWebsocketResponse({ sessionId, event: "Has come online" }, true);
    }
    onSendMessage(message, websocket, server) {
        return new volcano_ws_module_1.JsonWebsocketResponse({ person: websocket.sessionId, message }, true);
    }
    onSendWhisper(person, message, websocket, server) {
        const client = this.chatService.getUserWithSessionId(person);
        if (!client)
            throw new Error(`Client not found: ${person}`);
        return new volcano_ws_module_1.JsonWebsocketResponse({ person, message }, false, [client]);
    }
    onDisconnect(websocket, server) {
        this.chatService.setOffline(websocket.sessionId);
        return new volcano_ws_module_1.JsonWebsocketResponse({ message: 'Goodbye', event: "Has disconnected" }, true);
    }
};
__decorate([
    volcano_injection_module_1.Inject(chat_service_1.ChatService)
], ChatController.prototype, "chatService", void 0);
__decorate([
    volcano_ws_module_1.OnConnect([logger_ws_middleware_1.Logger])
], ChatController.prototype, "onConnect", null);
__decorate([
    volcano_ws_module_1.On('all', [guard_ws_middleware_1.Guard, logger_ws_middleware_1.Logger])
], ChatController.prototype, "onSendMessage", null);
__decorate([
    volcano_ws_module_1.On('whisper', [guard_ws_middleware_1.Guard, logger_ws_middleware_1.Logger])
], ChatController.prototype, "onSendWhisper", null);
__decorate([
    volcano_ws_module_1.OnDisconnect([logger_ws_middleware_1.Logger])
], ChatController.prototype, "onDisconnect", null);
ChatController = __decorate([
    volcano_http_module_1.Middleware(logger_ws_middleware_1.Logger),
    volcano_ws_module_1.WebsocketController()
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map