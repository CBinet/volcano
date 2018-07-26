var xml = require('xml');

import { Result } from "./result";
import { Response } from 'express-serve-static-core';

export class XmlResult extends Result {

    sendWith(response: Response): void {
        response.set('Content-Type', 'text/xml');
        response.status(this.statusCode).send(xml(this.content));
    }
}