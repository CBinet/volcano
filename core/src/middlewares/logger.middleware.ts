import { Request, Response } from 'express-serve-static-core';

import { Middleware } from '../volcano/middlewares/middleware';

export class Logger extends Middleware {

    intercept(request: Request, response: Response): boolean {
        console.log('I am interceptor');
        return true;
    }
}