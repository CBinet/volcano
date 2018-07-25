import { WsAction } from "./ws-action.enum";
import { WsOperationRegister } from "../operations/ws-operation-register";
import { WsOperation } from "../operations/ws-operation";

export class WsActionFactory {

    static createOperation(operationKey:string, action: WsAction, middlewares: any[]) {
        return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }

            const route = `/${target.constructor.name.replace('Controller', '').toLowerCase()}`;

            if (middlewares) {
                middlewares = middlewares.map(middleware => new middleware())
            }

            let operation: WsOperation = WsOperationRegister.resolve(route);
            if (!operation) {
                operation = {
                    controller: target.constructor.name,
                    route,
                    onConnect: {
                        function: () => {},
                        params: [],
                        middlewares: []
                    },
                    onMessage: new Map(),
                    onDisconnect: {
                        function: () => {},
                        params: [],
                        middlewares: []
                    },
                    operationName: operationKey
                }
            }

            switch (action) {
                case WsAction.OnConnect: {
                    operation.onConnect = {
                        function: descriptor.value,
                        params: [],
                        middlewares: middlewares
                    }
                    break;
                }
                case WsAction.OnMessage: {
                    operation.onMessage[operationKey] = {
                        function: descriptor.value,
                        params: descriptor.value.toString().split('(')[1].split(')')[0].split(',').map(s => s.trim()),
                        middlewares
                    }
                    break;
                }
                case WsAction.OnDisconnect: {
                    operation.onDisconnect = {
                        function: descriptor.value,
                        params: [],
                        middlewares: middlewares
                    }
                    break;
                }
            }
            
            WsOperationRegister.register(operation);

            return descriptor;
        }
    }

}