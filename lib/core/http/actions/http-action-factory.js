"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_operation_register_1 = require("../operations/http-operation-register");
class HttpActionFactory {
    static createOperation(action, route, middlewares) {
        return function (target, propertyKey, descriptor) {
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            const async = true;
            const params = HttpActionFactory.extractInnerFunctionParameters(descriptor);
            const innerFunction = HttpActionFactory.extractInnerFunction(descriptor);
            if (middlewares) {
                middlewares = middlewares.map(middleware => new middleware());
            }
            const operation = {
                async,
                action,
                route,
                operationName: propertyKey,
                controller: target.constructor.name,
                params,
                function: innerFunction,
                middlewares: middlewares
            };
            http_operation_register_1.HttpOperationRegister.register(operation);
            return descriptor;
        };
    }
    static extractInnerFunctionParameters(descriptor) {
        return descriptor.value.toString().split('{')[0].split('(')[1].split(',') // TODO : Refactor
            .map(value => value.replace(')', '').trim())
            .filter(value => value !== '');
    }
    static extractInnerFunction(descriptor) {
        const wrappedMethod = descriptor.value;
        return function () {
            const args = [];
            for (let argIndex = 0; argIndex < arguments.length; argIndex++) {
                args[argIndex] = arguments[argIndex];
            }
            return wrappedMethod.apply(this, args);
        };
    }
}
exports.HttpActionFactory = HttpActionFactory;
//# sourceMappingURL=http-action-factory.js.map