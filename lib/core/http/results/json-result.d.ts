import { Response } from 'express-serve-static-core';
import { Result } from './result';
export declare class JsonResult extends Result {
    sendWith(response: Response): void;
}
