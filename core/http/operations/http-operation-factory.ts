import { Request, Response } from 'express-serve-static-core';

import { HttpMiddlewareRegister } from '../middlewares/http-middleware-register';
import { ControllerRegister } from '../controllers/http-controller-register';
import { Result } from '../results/result';
import { HttpOperation } from './http-operation';
import { HttpMiddleware } from '../middlewares/http-middleware';

export class HttpOperationFactory {

    static createOperation(operation: HttpOperation, request: Request, response: Response) {

        let params: any[] = this.extractRequestParameters(operation.params, request);

        try {
            let middlewares = HttpMiddlewareRegister.resolve(operation.controller, operation.route);
            const operationMiddlewares = operation.middlewares ? operation.middlewares : [];
            middlewares = middlewares.concat(operationMiddlewares);

            var responseSent: boolean = HttpOperationFactory.applyMiddlewares(middlewares, request, response);
            if (!responseSent) {
                const result: Result = this.callInnerOperation(operation, params);
                result.sendWith(response);
            }
        }
        catch (error) {
            this.sendErrorDetails(error, response);
        }
    }

    private static applyMiddlewares(middlewares: HttpMiddleware[], request: Request, response: Response): boolean {
        var responseSent: boolean = false;
        middlewares.reverse().forEach((middleware: HttpMiddleware) => {
            responseSent = responseSent == true ? true : !middleware.intercept(request, response);
        });
        return responseSent;
    }

    private static extractRequestParameters(paramKeys: any[], request: Request) {
        let params: any[] = [];
        paramKeys.forEach(key => {
            params.push(request.params[key]);
        });
        params.push(request.body);
        params = params.filter(param => param != undefined);
        return params;
    }
    
    private static callInnerOperation(operation: HttpOperation, params: any[]): Result {
        const controller = ControllerRegister.resolve(operation.controller);
        const result: Result = controller[operation.operationName].apply(controller, params);
        return result;
    }

    
    private static sendErrorDetails(error: any, response: Response) {
        const exception: object = {};
        exception[error.name] = error.message;
        response.status(500).json(exception);
    }
}

