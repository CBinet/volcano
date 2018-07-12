import { Result } from "./result";
import { Response } from 'express-serve-static-core';

export class HtmlResult extends Result {

    sendWith(response: Response): void {
        response.status(this.statusCode).sendFile(this.content);
    }
}