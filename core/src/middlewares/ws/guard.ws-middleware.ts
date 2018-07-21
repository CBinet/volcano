import { Message } from '../../volcano/ws/messages/message';
import { WsMiddleware } from '../../volcano/ws/middlewares/ws-middleware';
import { Server } from '../../volcano/ws/server/server';
import { Websocket } from '../../volcano/ws/server/websocket';

export class Guard extends WsMiddleware {

    intercept(message: Message, websocket: Websocket, server: Server): boolean {
        websocket.send({error: 'Unauthorized access'});
        return false;
    }
}