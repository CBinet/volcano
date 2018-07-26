"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpOperationRegister {
    static register(operation) {
        HttpOperationRegister.operations.set(`${operation.action}/${operation.route}`, operation);
    }
    static get() {
        return HttpOperationRegister.operations;
    }
}
HttpOperationRegister.operations = new Map();
exports.HttpOperationRegister = HttpOperationRegister;
//# sourceMappingURL=http-operation-register.js.map