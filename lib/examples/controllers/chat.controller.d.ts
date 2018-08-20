import { Server, Websocket, WebsocketResponse, WsController } from '../../core/ws/volcano-ws.module';
import { ChatService } from '../services/chat.service';
export declare class ChatController extends WsController {
    chatService: ChatService;
    onConnect(websocket: Websocket, server: Server): WebsocketResponse;
    onSendMessage(message: string, websocket: Websocket, server: Server): WebsocketResponse;
    onSendWhisper(person: string, message: string, websocket: Websocket, server: Server): WebsocketResponse;
    onDisconnect(websocket: Websocket, server: Server): WebsocketResponse;
}
