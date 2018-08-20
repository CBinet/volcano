import { Result } from "./result";
import { Response } from 'express-serve-static-core';
export declare class TextResult extends Result {
    sendWith(response: Response): void;
}
