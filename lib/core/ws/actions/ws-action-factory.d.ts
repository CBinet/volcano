import { WsAction } from "./ws-action.enum";
export declare class WsActionFactory {
    static createOperation(operationKey: string, action: WsAction, middlewares: any[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
}
