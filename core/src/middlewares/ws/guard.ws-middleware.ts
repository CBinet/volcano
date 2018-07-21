import { Message } from '../../volcano/ws/messages/message';
import { WsMiddleware } from '../../volcano/ws/middlewares/ws-middleware';
import { Server } from '../../volcano/ws/server/server';
import { Websocket } from '../../volcano/ws/server/websocket';
import { JsonWebsocketResponse } from '../../volcano/ws/responses/json-websocket-response';

export class Guard extends WsMiddleware {

    intercept(message: Message, websocket: Websocket, server: Server): boolean {
        const response: JsonWebsocketResponse = new JsonWebsocketResponse({error: 'Unauthorized access'});
        response.sendWith(server, websocket);
        return false;
    }
}