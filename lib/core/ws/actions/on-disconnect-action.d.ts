import { WsMiddleware } from '../middlewares/ws-middleware';
export declare function OnDisconnect(middlewares?: typeof WsMiddleware[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
