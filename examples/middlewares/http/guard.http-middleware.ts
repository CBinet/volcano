import { HttpMiddleware, Request, Response } from '../../../core/http/volcano-http.module';

export class Guard extends HttpMiddleware {

    intercept(request: Request, response: Response): boolean {
        if (!request.headers.authorization) {
            response.status(401).send({Error: 'Unauthorized access'});
            return false;
        }
        return true;
    }
}