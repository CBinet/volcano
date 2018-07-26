import { Result } from "./result";
import { Response } from 'express-serve-static-core';

export class TextResult extends Result {

    sendWith(response: Response): void {
        response.status(this.statusCode).send(this.content);
    }
}