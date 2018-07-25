"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WsOperationRegister {
    static register(operation) {
        WsOperationRegister.operations.set(operation.route, operation);
    }
    static resolve(operationName) {
        return WsOperationRegister.operations.get(operationName);
    }
    static get() {
        const operations = [];
        WsOperationRegister
            .operations
            .forEach((operation, key) => operations.push(operation));
        return operations;
    }
}
WsOperationRegister.operations = new Map();
exports.WsOperationRegister = WsOperationRegister;
//# sourceMappingURL=ws-operation-register.js.map