import { Request, Response } from 'express-serve-static-core';
export declare abstract class HttpMiddleware {
    abstract intercept(request: Request, response: Response): boolean;
}
