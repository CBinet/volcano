"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_middleware_register_1 = require("../middlewares/http-middleware-register");
const http_controller_register_1 = require("../controllers/http-controller-register");
class HttpOperationFactory {
    static createOperation(operation, request, response) {
        let params = this.extractRequestParameters(operation.params, request);
        try {
            let middlewares = http_middleware_register_1.HttpMiddlewareRegister.resolve(operation.controller, operation.route);
            const operationMiddlewares = operation.middlewares ? operation.middlewares : [];
            middlewares = middlewares.concat(operationMiddlewares);
            var responseSent = HttpOperationFactory.applyMiddlewares(middlewares, request, response);
            if (!responseSent) {
                const result = this.callInnerOperation(operation, params);
                result.sendWith(response);
            }
        }
        catch (error) {
            this.sendErrorDetails(error, response);
        }
    }
    static applyMiddlewares(middlewares, request, response) {
        var responseSent = false;
        middlewares.reverse().forEach((middleware) => {
            responseSent = responseSent == true ? true : !middleware.intercept(request, response);
        });
        return responseSent;
    }
    static extractRequestParameters(paramKeys, request) {
        let params = [];
        paramKeys.forEach(key => {
            params.push(request.params[key]);
        });
        params.push(request.body);
        params = params.filter(param => param != undefined);
        return params;
    }
    static callInnerOperation(operation, params) {
        const controller = http_controller_register_1.ControllerRegister.resolve(operation.controller);
        const result = controller[operation.operationName].apply(controller, params);
        return result;
    }
    static sendErrorDetails(error, response) {
        const exception = {};
        exception[error.name] = error.message;
        response.status(500).json(exception);
    }
}
exports.HttpOperationFactory = HttpOperationFactory;
//# sourceMappingURL=http-operation-factory.js.map