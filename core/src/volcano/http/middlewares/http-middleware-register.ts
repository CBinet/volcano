import { HttpMiddleware } from "./http-middleware";

export class HttpMiddlewareRegister {

    private static controllerMiddlewares: Map<string, any[]> = new Map();
    private static operationMiddlewares: Map<string, any[]> = new Map();

    static registerForController(controllerName: string, middleware: any) {
        let middlewares = HttpMiddlewareRegister.controllerMiddlewares.get(controllerName)

        if (!middlewares) middlewares = []
        middlewares.push(middleware);

        HttpMiddlewareRegister.controllerMiddlewares.set(controllerName, middlewares);
    }

    static registerForOperation(route: string, middleware: any) {
        let middlewares = HttpMiddlewareRegister.operationMiddlewares.get(route)

        if (!middlewares) middlewares = []
        middlewares.push(middleware);

        HttpMiddlewareRegister.operationMiddlewares.set(route, middlewares);
    }

    static resolve(controllerName: string, route: string): any[] {
        let controllerMiddlewares = HttpMiddlewareRegister.controllerMiddlewares.get(controllerName);
        if (!controllerMiddlewares) controllerMiddlewares = [];

        let operationMiddlewares = HttpMiddlewareRegister.operationMiddlewares.get(route);
        if (!operationMiddlewares) operationMiddlewares = [];

        return controllerMiddlewares.concat(operationMiddlewares);
    }
}