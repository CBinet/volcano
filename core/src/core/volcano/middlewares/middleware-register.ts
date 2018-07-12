import { Middleware } from "./middleware";

export class MiddlewareRegister {

    private static middlewares: Map<string, Middleware[]> = new Map();

    static register(controllerName: string, middleware: Middleware) {
        let middlewares = MiddlewareRegister.middlewares.get(controllerName)

        if (!middlewares) middlewares = []
        middlewares.push(middleware);

        MiddlewareRegister.middlewares.set(controllerName, middlewares);
    }

    static resolve(controllerName: string): Middleware[] {
        const middlewares = MiddlewareRegister.middlewares.get(controllerName);

        if (middlewares) return middlewares;
        else return [];
    }
}