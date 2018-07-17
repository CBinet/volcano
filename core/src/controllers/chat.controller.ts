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

@WebsocketController()
export class ChatController extends WsController {

    @OnConnect()
    onConnect(server: WebSocket.Server): WebsocketResponse {
        return new JsonWebsocketResponse({message: 'hello'}, true);
    }

    @On('all')
    onSendMessage(message: string, server: WebSocket.Server) : WebsocketResponse {
        return new TextWebsocketResponse(message, true);
    }

    @On('whisper')
    onSendWhisper(person: string, message: string, server: WebSocket.Server) : WebsocketResponse {
        return new XmlWebsocketResponse({message});
    }

    @OnDisconnect()
    onDisconnect(server: WebSocket.Server) : WebsocketResponse {
        return new JsonWebsocketResponse({message: 'Goodbye'}, true);
    }
    
}