import { WsMiddleware } from '../middlewares/ws-middleware';
export declare function OnConnect(middlewares?: typeof WsMiddleware[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
