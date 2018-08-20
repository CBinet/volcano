import { Message, Server, Websocket, WsMiddleware } from '../../../core/ws/volcano-ws.module';
export declare class Logger extends WsMiddleware {
    intercept(message: Message, websocket: Websocket, server: Server): boolean;
}
