import { Request, Response } from 'express-serve-static-core';

export abstract class Middleware {

    abstract intercept(request: Request): void;
}