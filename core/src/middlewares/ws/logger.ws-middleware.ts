import { WsMiddleware } from '../../volcano/ws/middlewares/ws-middleware';
import { Message } from '../../volcano/ws/messages/message';
import { Websocket } from '../../volcano/ws/server/websocket';
import { Server } from '../../volcano/ws/server/server';

export class Logger extends WsMiddleware {

    intercept(message: Message, websocket: Websocket, server: Server): boolean {
        console.log('I am websocket interceptor')
        return true;
    };
}