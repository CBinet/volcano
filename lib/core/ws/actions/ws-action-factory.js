"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_action_enum_1 = require("./ws-action.enum");
const ws_operation_register_1 = require("../operations/ws-operation-register");
class WsActionFactory {
    static createOperation(operationKey, action, middlewares) {
        return function (target, propertyKey, descriptor) {
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            const route = `/${target.constructor.name.replace('Controller', '').toLowerCase()}`;
            if (middlewares) {
                middlewares = middlewares.map(middleware => new middleware());
            }
            let operation = ws_operation_register_1.WsOperationRegister.resolve(route);
            if (!operation) {
                operation = {
                    controller: target.constructor.name,
                    route,
                    onConnect: {
                        function: () => { },
                        params: [],
                        middlewares: []
                    },
                    onMessage: new Map(),
                    onDisconnect: {
                        function: () => { },
                        params: [],
                        middlewares: []
                    },
                    operationName: operationKey
                };
            }
            switch (action) {
                case ws_action_enum_1.WsAction.OnConnect: {
                    operation.onConnect = {
                        function: descriptor.value,
                        params: [],
                        middlewares: middlewares
                    };
                    break;
                }
                case ws_action_enum_1.WsAction.OnMessage: {
                    operation.onMessage[operationKey] = {
                        function: descriptor.value,
                        params: descriptor.value.toString().split('(')[1].split(')')[0].split(',').map(s => s.trim()),
                        middlewares
                    };
                    break;
                }
                case ws_action_enum_1.WsAction.OnDisconnect: {
                    operation.onDisconnect = {
                        function: descriptor.value,
                        params: [],
                        middlewares: middlewares
                    };
                    break;
                }
            }
            ws_operation_register_1.WsOperationRegister.register(operation);
            return descriptor;
        };
    }
}
exports.WsActionFactory = WsActionFactory;
//# sourceMappingURL=ws-action-factory.js.map