"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_middleware_register_1 = require("../middlewares/http-middleware-register");
const http_controller_register_1 = require("../controllers/http-controller-register");
class HttpOperationFactory {
    static createOperation(operation, request, response) {
        let params = this.extractRequestParameters(operation.params, request, response);
        try {
            let middlewares = http_middleware_register_1.HttpMiddlewareRegister.resolve(operation.controller, operation.route);
            const operationMiddlewares = operation.middlewares ? operation.middlewares : [];
            middlewares = middlewares.concat(operationMiddlewares);
            var responseSent = HttpOperationFactory.applyMiddlewares(middlewares, request, response);
            if (!responseSent) {
                this.callInnerOperation(operation, params).then((result) => {
                    if (result) {
                        result.sendWith(response);
                    }
                }).catch(error => {
                    this.sendErrorDetails(error, response);
                });
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
    static extractRequestParameters(paramKeys, request, response) {
        let params = [];
        paramKeys.forEach(key => {
            params.push(request.params[key]);
        });
        params.push(request.body);
        params.push(request);
        params.push(response);
        params = params.filter(param => param != undefined);
        return params;
    }
    static callInnerOperation(operation, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = http_controller_register_1.ControllerRegister.resolve(operation.controller);
            console.log(params[2].json);
            const result = yield controller[operation.operationName].apply(controller, params);
            return result;
        });
    }
    static sendErrorDetails(error, response) {
        const exception = {};
        exception[error.name] = error.message;
        response.status(500).json(exception);
    }
}
exports.HttpOperationFactory = HttpOperationFactory;
//# sourceMappingURL=http-operation-factory.js.map