import { Request, Response } from 'express-serve-static-core';

import { Middleware } from '../core/volcano/middlewares/middleware';

export class Guard extends Middleware {
    
    intercept(request: Request, response: Response): boolean {
        if (!request.headers.authorization) {
            response.status(401).send({Error: 'Unauthorized access'})
            return false;
        }
        return true;
    }
}