import { Middleware } from "../core/volcano/middlewares/middleware";
import { Request, Response } from 'express-serve-static-core';

export class Logger extends Middleware {

    intercept(request: Request, response: Response): boolean {
        console.log('I am interceptor');
        return true;
    }
}