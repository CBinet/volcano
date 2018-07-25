import { Request, Response } from 'express-serve-static-core';

export abstract class HttpMiddleware {

    abstract intercept(request: Request, response: Response): boolean;
}