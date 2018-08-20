import { WsMiddleware } from '../middlewares/ws-middleware';
export declare function On(operationKey: string, middlewares?: typeof WsMiddleware[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
