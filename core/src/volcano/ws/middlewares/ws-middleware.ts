import { Message } from "../messages/message";
import { Websocket } from "../server/websocket";
import { Server } from "../server/server";

export abstract class WsMiddleware {

    abstract intercept(message: Message, websocket: Websocket, server: Server): boolean;
}