import { Request, Response } from 'express-serve-static-core';
import { HttpMiddleware } from '../../volcano/http/middlewares/http-middleware';

export class Logger extends HttpMiddleware {

    intercept(request: Request, response: Response): boolean {
        console.log('I am interceptor');
        return true;
    }
}