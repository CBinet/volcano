"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChatService_1;
const injectable_decorator_1 = require("../../core/injection/decorators/injectable.decorator");
const guid_1 = require("../../core/utilities/guid/guid");
let ChatService = ChatService_1 = class ChatService {
    constructor() {
        this.onlineUsers = new Map();
    }
    setOnline(websocket) {
        const sessionId = guid_1.Guid.generate();
        websocket.sessionId = sessionId;
        this.onlineUsers.set(sessionId, websocket);
        return sessionId;
    }
    setOffline(sessionId) {
        this.onlineUsers.delete(sessionId);
    }
    getUserWithSessionId(sessionId) {
        return this.onlineUsers.get(sessionId);
    }
    sessionIdIsValid(sessionId) {
        return this.onlineUsers.has(sessionId) &&
            this.onlineUsers.get(sessionId).sessionId === sessionId;
    }
};
ChatService = ChatService_1 = __decorate([
    injectable_decorator_1.Injectable(ChatService_1)
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map