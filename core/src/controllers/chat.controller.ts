import { ChatService } from '../services/chat.service';
import { Inject } from '../volcano/injection/decorators/inject.decorator';
import { Guid } from '../volcano/utilities/guid';
import { On } from '../volcano/ws/actions/on-action.decorator';
import { OnConnect } from '../volcano/ws/actions/on-connect-action.decorator';
import { OnDisconnect } from '../volcano/ws/actions/on-disconnect-action';
import { WsController } from '../volcano/ws/controllers/ws-controller';
import { WebsocketController } from '../volcano/ws/controllers/ws-controller.decorator';
import { JsonWebsocketResponse } from '../volcano/ws/responses/json-websocket-response';
import { TextWebsocketResponse } from '../volcano/ws/responses/text-websocket-response';
import { WebsocketResponse } from '../volcano/ws/responses/websocket-response';
import { XmlWebsocketResponse } from '../volcano/ws/responses/xml-websocket-response';
import { Server } from '../volcano/ws/server/server';
import { Websocket } from '../volcano/ws/server/websocket';
import { Middleware } from '../volcano/http/middlewares/http-middleware.decorator';
import { Logger } from '../middlewares/ws/logger.ws-middleware';
import { Guard } from '../middlewares/ws/guard.ws-middleware';

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
        return new TextWebsocketResponse(message, true);
    }

    @On('whisper', [Logger])
    onSendWhisper(person: string, message: string, websocket: Websocket, server: Server) : WebsocketResponse {
        const clients: Websocket[] = this.findClientById(server, person);
        return new XmlWebsocketResponse({person, message}, false, clients);
    }

    @OnDisconnect([Logger])
    onDisconnect(websocket: Websocket, server: Server) : WebsocketResponse {
        return new JsonWebsocketResponse({message: 'Goodbye', event: "Has disconnected"}, true);
    }
    
}