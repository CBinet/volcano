import { WsActionFactory } from './ws-action-factory';
import { WsAction } from './ws-action.enum';

export function OnDisconnect(middlewares?: any[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return WsActionFactory.createOperation('onDisconnect', WsAction.OnDisconnect, middlewares);
}