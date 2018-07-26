"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_middleware_register_1 = require("./http-middleware-register");
exports.Middleware = (middleware) => {
    return (target) => {
        const controllerName = target.name;
        const instance = new middleware();
        http_middleware_register_1.HttpMiddlewareRegister.registerForController(controllerName, instance);
        return target;
    };
};
//# sourceMappingURL=http-middleware.decorator.js.map