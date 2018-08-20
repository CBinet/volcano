import { HttpMiddleware, Request, Response } from '../../../core/http/volcano-http.module';
export declare class Guard extends HttpMiddleware {
    intercept(request: Request, response: Response): boolean;
}
