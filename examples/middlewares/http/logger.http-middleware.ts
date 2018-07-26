import { HttpMiddleware, Request, Response } from '../../../core/http/volcano-http.module';

export class Logger extends HttpMiddleware {

    intercept(request: Request, response: Response): boolean {
        console.log('I am interceptor');
        return true;
    }
}