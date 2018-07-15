import { HttpAction } from "../http-action.enum";
import { HttpOperation } from "../../volcano/operations/http/http-operation";
import { HttpOperationRegister } from "../../volcano/operations/http/http-operation-register";

export class HttpActionFactory {
    
    static createOperation(action: HttpAction, route: string) {
        return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
            }
            
            const params = HttpActionFactory.extractInnerFunctionParameters(descriptor);

            const innerFunction = HttpActionFactory.extractInnerFunction(descriptor);

            const operation: HttpOperation = {
                action,
                route,
                operationName: propertyKey,
                controller: target.constructor.name,
                params,
                function: innerFunction
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