export declare class HttpMiddlewareRegister {
    private static controllerMiddlewares;
    private static operationMiddlewares;
    static registerForController(controllerName: string, middleware: any): void;
    static registerForOperation(route: string, middleware: any): void;
    static resolve(controllerName: string, route: string): any[];
}
