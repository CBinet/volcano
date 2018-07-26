import { Middleware } from '../../core/http/volcano-http.module';
import { Inject } from '../../core/injection/volcano-injection.module';
import {
    JsonWebsocketResponse,
    On,
    OnConnect,
    OnDisconnect,
    Server,
    Websocket,
    WebsocketController,
    WebsocketResponse,
    WsController,
} from '../../core/ws/volcano-ws.module';
import { Guard } from '../middlewares/ws/guard.ws-middleware';
import { Logger } from '../middlewares/ws/logger.ws-middleware';
import { ChatService } from '../services/chat.service';

@Middleware(Logger)
@WebsocketController()
export class ChatController extends WsController {

    @Inject(ChatService) chatService: ChatService;

    @OnConnect([Logger])
    onConnect(websocket: Websocket, server: Server): WebsocketResponse {

        const sessionId = this.chatService.setOnline(websocket);
        
        return new JsonWebsocketResponse({sessionId, event: "Has come online"}, true);
    }

    @On('all', [Guard, Logger])
    onSendMessage(message: string, websocket: Websocket, server: Server) : WebsocketResponse {

        return new JsonWebsocketResponse({person: websocket.sessionId, message}, true);
    }

    @On('whisper', [Guard, Logger])
    onSendWhisper(person: string, message: string, websocket: Websocket, server: Server) : WebsocketResponse {

        const client: Websocket = this.chatService.getUserWithSessionId(person);

        if (!client) throw new Error(`Client not found: ${person}`);

        return new JsonWebsocketResponse({person, message}, false, [client]);
    }

    @OnDisconnect([Logger])
    onDisconnect(websocket: Websocket, server: Server) : WebsocketResponse {

        this.chatService.setOffline(websocket.sessionId);

        return new JsonWebsocketResponse({message: 'Goodbye', event: "Has disconnected"}, true);
    }
    
}