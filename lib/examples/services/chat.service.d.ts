import { Websocket } from '../../core/ws/server/websocket';
export declare class ChatService {
    private onlineUsers;
    setOnline(websocket: Websocket): string;
    setOffline(sessionId: string): void;
    getUserWithSessionId(sessionId: string): Websocket;
    sessionIdIsValid(sessionId: any): boolean;
}
