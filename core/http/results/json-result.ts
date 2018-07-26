import { Response } from 'express-serve-static-core';

import { Result } from './result';

export class JsonResult extends Result {

    sendWith(response: Response): void {
        response.status(this.statusCode).json(this.content);
    }
}