import { Message, Server, Websocket, WsMiddleware } from '../../volcano/ws/volcano-ws.module';

export class Logger extends WsMiddleware {

    intercept(message: Message, websocket: Websocket, server: Server): boolean {
        console.log('I am websocket interceptor')
        return true;
    };
}