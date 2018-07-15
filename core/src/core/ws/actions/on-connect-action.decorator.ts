import { WsActionFactory } from './ws-action-factory';
import { WsAction } from './ws-action.enum';

export function OnConnect(): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return WsActionFactory.createOperation('onConnect', WsAction.OnConnect);
}