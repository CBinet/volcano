import { Guard } from '../middlewares/ws/guard.ws-middleware';
import { Logger } from '../middlewares/ws/logger.ws-middleware';
import { ChatService } from '../services/chat.service';
import { Middleware } from '../volcano/http/middlewares/http-middleware.decorator';
import { Inject } from '../volcano/injection/decorators/inject.decorator';
import { On } from '../volcano/ws/actions/on-action.decorator';
import { OnConnect } from '../volcano/ws/actions/on-connect-action.decorator';
import { OnDisconnect } from '../volcano/ws/actions/on-disconnect-action';
import { WsController } from '../volcano/ws/controllers/ws-controller';
import { WebsocketController } from '../volcano/ws/controllers/ws-controller.decorator';
import { JsonWebsocketResponse } from '../volcano/ws/responses/json-websocket-response';
import { WebsocketResponse } from '../volcano/ws/responses/websocket-response';
import { Server } from '../volcano/ws/server/server';
import { Websocket } from '../volcano/ws/server/websocket';

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