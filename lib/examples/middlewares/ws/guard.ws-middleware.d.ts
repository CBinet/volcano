import { Message, Server, Websocket, WsMiddleware } from '../../../core/ws/volcano-ws.module';
import { ChatService } from '../../services/chat.service';
export declare class Guard extends WsMiddleware {
    chatService: ChatService;
    intercept(message: Message, websocket: Websocket, server: Server): boolean;
    private sessionIdIsValid;
}
