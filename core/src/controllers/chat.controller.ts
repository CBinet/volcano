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

@WebsocketController()
export class ChatController extends WsController {

    @Inject(ChatService) chatService: ChatService;

    @OnConnect()
    onConnect(websocket: Websocket, server: Server): WebsocketResponse {
        const id = Guid.generate();

        this.chatService.setOnline(id);
        websocket.id = id;

        return new JsonWebsocketResponse({token: id});
    }

    @On('all')
    onSendMessage(message: string, websocket: Websocket, server: Server) : WebsocketResponse {
        return new TextWebsocketResponse(message, true);
    }

    @On('whisper')
    onSendWhisper(person: string, message: string, websocket: Websocket, server: Server) : WebsocketResponse {
        return new XmlWebsocketResponse({person, message});
    }

    @OnDisconnect()
    onDisconnect(websocket: Websocket, server: Server) : WebsocketResponse {
        return new JsonWebsocketResponse({message: 'Goodbye'}, true);
    }
    
}