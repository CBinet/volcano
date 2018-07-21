import { Request, Response } from 'express-serve-static-core';
import { HttpMiddleware } from '../../volcano/http/middlewares/http-middleware';

export class Guard extends HttpMiddleware {

    intercept(request: Request, response: Response): boolean {
        if (!request.headers.authorization) {
            response.status(401).send({Error: 'Unauthorized access'});
            return false;
        }
        return true;
    }
}