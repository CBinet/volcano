import * as WebSocket from 'ws';
import { WebsocketController } from '../volcano/ws/controllers/ws-controller.decorator';
import { OnConnect } from '../volcano/ws/actions/on-connect-action.decorator';
import { WsController } from '../volcano/ws/controllers/ws-controller';
import { On } from '../volcano/ws/actions/on-action.decorator';
import { OnDisconnect } from '../volcano/ws/actions/on-disconnect-action';
import { WebsocketResponse } from '../volcano/ws/responses/websocket-response';
import { JsonWebsocketResponse } from '../volcano/ws/responses/json-websocket-response';
import { XmlWebsocketResponse } from '../volcano/ws/responses/xml-websocket-response';
import { TextWebsocketResponse } from '../volcano/ws/responses/text-websocket-response';
import { Inject } from '../volcano/injection/decorators/inject.decorator';
import { ChatService } from '../services/chat.service';

@WebsocketController()
export class ChatController extends WsController {

    @Inject(ChatService) chatService: ChatService;

    @OnConnect()
    onConnect(websocket: WebSocket, server: WebSocket.Server): WebsocketResponse {
        this.chatService.setOnline('abc');

        return new JsonWebsocketResponse({token: 'abc'});
    }

    @On('all')
    onSendMessage(message: string, websocket: WebSocket, server: WebSocket.Server) : WebsocketResponse {
        return new TextWebsocketResponse(message, true);
    }

    @On('whisper')
    onSendWhisper(person: string, message: string, websocket: WebSocket, server: WebSocket.Server) : WebsocketResponse {
        return new XmlWebsocketResponse({person, message});
    }

    @OnDisconnect()
    onDisconnect(websocket: WebSocket, server: WebSocket.Server) : WebsocketResponse {
        return new JsonWebsocketResponse({message: 'Goodbye'}, true);
    }
    
}