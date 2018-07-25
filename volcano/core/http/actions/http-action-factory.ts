import { HttpAction } from "./http-action.enum";
import { HttpOperation } from "../operations/http-operation";
import { HttpOperationRegister } from "../operations/http-operation-register";
import { HttpMiddleware } from "../middlewares/http-middleware";

export class HttpActionFactory {
    
    static createOperation(action: HttpAction, route: string, middlewares: any[]) {
        return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            
            const params = HttpActionFactory.extractInnerFunctionParameters(descriptor);

            const innerFunction = HttpActionFactory.extractInnerFunction(descriptor);

            if (middlewares) {
                middlewares = middlewares.map(middleware => new middleware())
            }

            const operation: HttpOperation = {
                action,
                route,
                operationName: propertyKey,
                controller: target.constructor.name,
                params,
                function: innerFunction,
                middlewares: middlewares
            };

            HttpOperationRegister.register(operation);

            return descriptor;
        }
    }
    
    private static extractInnerFunctionParameters(descriptor: PropertyDescriptor) {
        return descriptor.value.toString().split('{')[0].split('(')[1].split(',') // TODO : Refactor
            .map(value => value.replace(')', '').trim())
            .filter(value => value !== '');
    }
    
    private static extractInnerFunction(descriptor: PropertyDescriptor) {
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