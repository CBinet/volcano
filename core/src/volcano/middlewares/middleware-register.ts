import { Middleware } from "./middleware";

export class MiddlewareRegister {

    private static controllerMiddlewares: Map<string, Middleware[]> = new Map();
    private static operationMiddlewares: Map<string, Middleware[]> = new Map();

    static registerForController(controllerName: string, middleware: Middleware) {
        let middlewares = MiddlewareRegister.controllerMiddlewares.get(controllerName)

        if (!middlewares) middlewares = []
        middlewares.push(middleware);

        MiddlewareRegister.controllerMiddlewares.set(controllerName, middlewares);
    }

    static registerForOperation(route: string, middleware: Middleware) {
        let middlewares = MiddlewareRegister.operationMiddlewares.get(route)

        if (!middlewares) middlewares = []
        middlewares.push(middleware);

        MiddlewareRegister.operationMiddlewares.set(route, middlewares);
    }

    static resolve(controllerName: string, route: string): Middleware[] {
        let controllerMiddlewares = MiddlewareRegister.controllerMiddlewares.get(controllerName);
        if (!controllerMiddlewares) controllerMiddlewares = [];

        let operationMiddlewares = MiddlewareRegister.operationMiddlewares.get(route);
        if (!operationMiddlewares) operationMiddlewares = [];

        return controllerMiddlewares.concat(operationMiddlewares);
    }
}