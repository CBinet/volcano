import { Injectable } from '../volcano/injection/decorators/injectable.decorator';
import { Websocket } from '../volcano/ws/server/websocket';
import { Guid } from '../volcano/utilities/guid/guid';

@Injectable(ChatService)
export class ChatService {

    private onlineUsers: Map<string, Websocket> = new Map();

    setOnline(websocket: Websocket): string {
        const sessionId = Guid.generate();
        websocket.sessionId = sessionId;

        this.onlineUsers.set(sessionId, websocket);

        return sessionId;
    }

    setOffline(sessionId: string): void {
        this.onlineUsers.delete(sessionId);
    }

    getUserWithSessionId(sessionId: string) {
        return this.onlineUsers.get(sessionId);
    }

    sessionIdIsValid(sessionId: any): boolean {
        return this.onlineUsers.has(sessionId) &&
               this.onlineUsers.get(sessionId).sessionId === sessionId;
    }
}