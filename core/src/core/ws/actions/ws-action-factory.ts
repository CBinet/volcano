import { WsAction } from "./ws-action.enum";
import { WsOperationRegister } from "../../volcano/operations/ws/ws-operation-register";
import { WsOperation } from "../../volcano/operations/ws/ws-operation";
import { FunctionSignature } from "../../volcano/operations/ws/function-signature";

export class WsActionFactory {

    static createOperation(operationKey:string, action: WsAction) {
        return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            console.log(operationKey, target, propertyKey, descriptor);
            const operation: WsOperation = {
                route: '/chat',
                operationName: operationKey,
                controller: target.constructor.name,
                onConnect: () => {},
                onMessage: new Map<string, FunctionSignature>(),
                onDisconnect: () => {}
            }

            WsOperationRegister.register(operation);

            return descriptor;
        }
    }

}