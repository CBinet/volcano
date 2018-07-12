import { Response } from 'express-serve-static-core';

import { HttpStatusCode } from '../http-status-code.enum';

export abstract class Result {

    constructor(protected statusCode: HttpStatusCode, protected content?: any) {}

    static create(statusCode: HttpStatusCode, content?: any): Result {
        throw new Error("Method not implemented.");
    }

    abstract sendWith(response: Response): void;
}