import { WsActionFactory } from './ws-action-factory';
import { WsAction } from './ws-action.enum';

export function On(operationKey: string, middlewares?: any[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return WsActionFactory.createOperation(operationKey, WsAction.OnMessage, middlewares);
}