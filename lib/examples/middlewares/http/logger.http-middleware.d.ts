import { HttpMiddleware, Request, Response } from '../../../core/http/volcano-http.module';
export declare class Logger extends HttpMiddleware {
    intercept(request: Request, response: Response): boolean;
}
