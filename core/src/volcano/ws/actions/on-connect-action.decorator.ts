import { WsActionFactory } from './ws-action-factory';
import { WsAction } from './ws-action.enum';
import { WsMiddleware } from '../middlewares/ws-middleware';

export function OnConnect(middlewares?: typeof WsMiddleware[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return WsActionFactory.createOperation('onConnect', WsAction.OnConnect, middlewares);
}