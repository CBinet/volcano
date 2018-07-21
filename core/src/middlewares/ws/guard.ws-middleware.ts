import { Message } from '../../volcano/ws/messages/message';
import { WsMiddleware } from '../../volcano/ws/middlewares/ws-middleware';
import { Server } from '../../volcano/ws/server/server';
import { Websocket } from '../../volcano/ws/server/websocket';
import { JsonWebsocketResponse } from '../../volcano/ws/responses/json-websocket-response';
import { Inject } from '../../volcano/injection/decorators/inject.decorator';
import { ChatService } from '../../services/chat.service';

export class Guard extends WsMiddleware {

    @Inject(ChatService) chatService: ChatService;

    intercept(message: Message, websocket: Websocket, server: Server): boolean {

        let sessionIdIsValid: boolean = this.sessionIdIsValid(message);

        if (sessionIdIsValid) {
            return true;
        } else {
            const response: JsonWebsocketResponse = new JsonWebsocketResponse({error: 'Unauthorized access'});
            response.sendWith(server, websocket);
            return false;
        }
    }

    private sessionIdIsValid(message: Message) {
        let sessionIdIsValid: boolean = false;
        if (message.headers && message.headers.authorization) {
            sessionIdIsValid = this.chatService.sessionIdIsValid(message.headers.authorization);
        }
        return sessionIdIsValid;
    }
}