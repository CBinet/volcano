import { HttpAction } from "./http-action.enum";
export declare class HttpActionFactory {
    static createOperation(action: HttpAction, route: string, middlewares: any[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    private static extractInnerFunctionParameters;
    private static extractInnerFunction;
}
