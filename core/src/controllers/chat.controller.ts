import { WsController } from '../core/volcano/controllers/ws-controller';
import { OnConnect } from '../core/ws/actions/on-connect-action.decorator';
import { On } from '../core/ws/actions/on-action.decorator';
import { OnDisconnect } from '../core/ws/actions/on-disconnect-action';
import { WebsocketController } from '../core/volcano/controllers/ws-controller.decorator';
import * as WebSocket from 'ws';

@WebsocketController()
export class ChatController extends WsController {
    
    @OnConnect()
    onConnect(server: WebSocket.Server): void {
        console.log('allo');
    }

    @On('all')
    onSendMessage(message: string, server: WebSocket.Server) {

    }

    @On('whisper')
    onSendWhisper(person: string, message: string, server: WebSocket.Server) {

    }

    @OnDisconnect()
    onDisconect(server: WebSocket.Server) {

    }
    
}