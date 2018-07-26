import { WsActionFactory } from './ws-action-factory';
import { WsAction } from './ws-action.enum';
import { WsMiddleware } from '../middlewares/ws-middleware';

export function On(operationKey: string, middlewares?: typeof WsMiddleware[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return WsActionFactory.createOperation(operationKey, WsAction.OnMessage, middlewares);
}