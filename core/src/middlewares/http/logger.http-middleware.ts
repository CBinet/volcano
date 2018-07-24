import { HttpMiddleware, Request, Response } from '../../volcano/http/volcano-http.module';

export class Logger extends HttpMiddleware {

    intercept(request: Request, response: Response): boolean {
        console.log('I am interceptor');
        return true;
    }
}