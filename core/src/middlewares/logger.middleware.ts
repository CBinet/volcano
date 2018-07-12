import { Middleware } from "../core/volcano/middlewares/middleware";
import { Request, Response } from 'express-serve-static-core';

export class Logger extends Middleware {

    intercept(request: Request) {
        console.log('I am interceptor');
    }
}