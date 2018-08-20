import { Response } from 'express-serve-static-core';
import { HttpStatusCode } from '../http-status-code.enum';
export declare abstract class Result {
    protected statusCode: HttpStatusCode;
    protected content?: any;
    constructor(statusCode: HttpStatusCode, content?: any);
    static create(statusCode: HttpStatusCode, content?: any): Result;
    abstract sendWith(response: Response): void;
}
