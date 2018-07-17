import { WsAction } from "./ws-action.enum";
import { WsOperationRegister } from "../operations/ws-operation-register";
import { WsOperation } from "../operations/ws-operation";

export class WsActionFactory {

    static createOperation(operationKey:string, action: WsAction) {
        return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }

            const route = `/${target.constructor.name.replace('Controller', '').toLowerCase()}`;
            console.log(route);

            let operation: WsOperation = WsOperationRegister.resolve(route);
            if (!operation) {
                operation = {
                    controller: target.constructor.name,
                    route,
                    onConnect: () => {},
                    onMessage: new Map(),
                    onDisconnect: () => {},
                    operationName: operationKey
                }
            }

            switch (action) {
                case WsAction.OnConnect: {
                    operation.onConnect = descriptor.value;
                    break;
                }
                case WsAction.OnMessage: {
                    operation.onMessage[operationKey] = {
                        function: descriptor.value,
                        params: descriptor.value.toString().split('(')[1].split(')')[0].split(',').map(s => s.trim())
                    }
                    break;
                }
                case WsAction.OnDisconnect: {
                    operation.onDisconnect = descriptor.value;
                    break;
                }
            }
            
            console.log(operation);
            WsOperationRegister.register(operation);

            return descriptor;
        }
    }

}