import { Request, Response } from 'express-serve-static-core';
import { HttpOperation } from './http-operation';
export declare class HttpOperationFactory {
    static createOperation(operation: HttpOperation, request: Request, response: Response): void;
    private static applyMiddlewares;
    private static extractRequestParameters;
    private static callInnerOperation;
    private static sendErrorDetails;
}
