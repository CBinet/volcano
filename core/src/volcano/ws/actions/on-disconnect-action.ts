import { WsActionFactory } from './ws-action-factory';
import { WsAction } from './ws-action.enum';
import { WsMiddleware } from '../middlewares/ws-middleware';

export function OnDisconnect(middlewares?: typeof WsMiddleware[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return WsActionFactory.createOperation('onDisconnect', WsAction.OnDisconnect, middlewares);
}