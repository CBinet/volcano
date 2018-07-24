import { ChatService } from '../../services/chat.service';
import { Inject } from '../../volcano/injection/volcano-injection.module';
import { JsonWebsocketResponse, Message, Server, Websocket, WsMiddleware } from '../../volcano/ws/volcano-ws.module';

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