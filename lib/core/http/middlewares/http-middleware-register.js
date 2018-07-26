"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpMiddlewareRegister {
    static registerForController(controllerName, middleware) {
        let middlewares = HttpMiddlewareRegister.controllerMiddlewares.get(controllerName);
        if (!middlewares)
            middlewares = [];
        middlewares.push(middleware);
        HttpMiddlewareRegister.controllerMiddlewares.set(controllerName, middlewares);
    }
    static registerForOperation(route, middleware) {
        let middlewares = HttpMiddlewareRegister.operationMiddlewares.get(route);
        if (!middlewares)
            middlewares = [];
        middlewares.push(middleware);
        HttpMiddlewareRegister.operationMiddlewares.set(route, middlewares);
    }
    static resolve(controllerName, route) {
        let controllerMiddlewares = HttpMiddlewareRegister.controllerMiddlewares.get(controllerName);
        if (!controllerMiddlewares)
            controllerMiddlewares = [];
        let operationMiddlewares = HttpMiddlewareRegister.operationMiddlewares.get(route);
        if (!operationMiddlewares)
            operationMiddlewares = [];
        return controllerMiddlewares.concat(operationMiddlewares);
    }
}
HttpMiddlewareRegister.controllerMiddlewares = new Map();
HttpMiddlewareRegister.operationMiddlewares = new Map();
exports.HttpMiddlewareRegister = HttpMiddlewareRegister;
//# sourceMappingURL=http-middleware-register.js.map