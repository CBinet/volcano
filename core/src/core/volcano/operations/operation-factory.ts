import { Request, Response } from 'express-serve-static-core';

import { ControllerRegister } from '../controllers/controller-register';
import { Operation } from './operation';
import { Result } from '../../http/results/result';
import { MiddlewareRegister } from '../middlewares/middleware-register';

export class OperationFactory {

    static createOperation(operation: Operation, request: Request, response: Response) {
        const middlewares = MiddlewareRegister.resolve(operation.controller);
        let params: any[] = this.extractRequestParameters(operation.params, request);
        try {
            middlewares.forEach(middleware => {
                middleware.intercept(request);
            });
            const result: Result = this.callInnerOperation(operation, params);
            result.sendWith(response);
        }
        catch (error) {
            this.sendErrorDetails(error, response);
        }
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
    
    private static callInnerOperation(operation: Operation, params: any[]): Result {
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

