import bodyParser = require('body-parser');
import express = require('express');
import { Express, Request, Response } from 'express-serve-static-core';

import { CarController } from './controllers/car.controller';
import { PingController } from './controllers/ping.controller';
import { HttpAction } from './core/http/http-action.enum';
import { Operation } from './core/volcano/operations/operation';
import { OperationRegister } from './core/volcano/operations/operation-register';
import { OperationFactory } from './core/volcano/operations/operation-factory';
import { PagesController } from './controllers/pages.controller';
import { LegacyController } from './controllers/legacy.controller';
import { TextController } from './controllers/text-controller';
import { MiddlewareRegister } from './core/volcano/middlewares/middleware-register';
import { Logger } from './middlewares/logger.middleware';

const app: Express = express();
app.use(bodyParser.json());
const PORT = 3000;

[Logger];
[PingController, CarController, PagesController, LegacyController, TextController];

const operations: Operation[] = [];
OperationRegister.get().forEach(value => operations.push(value));

operations.forEach((operation: Operation) => {
    switch (operation.action) {
        case HttpAction.GET: {
            addGetOperation(app, operation);
            break;
        }
        case HttpAction.POST: {
            addPostOperation(app, operation);
            break;
        }
        case HttpAction.PUT: {
            addPutOperation(app, operation);
            break;
        }
        case HttpAction.DELETE: {
            addDeleteOperation(app, operation);
            break;
        }
        default: {
            throw new Error(`Unknown Http action: ${operation.action}`);
        }
    }
});
 
function addGetOperation(app: Express, operation: Operation) {
    // const middlewares = MiddlewareRegister.resolve(operation.controller);
    // middlewares.forEach(middleware => {
    //     console.log(middleware);
    //     app.use(middleware.intercept());
    // });

    app.get(`/${operation.route}`, (request: Request, response: Response) => {
        OperationFactory.createOperation(operation, request, response);
    });
}

function addPostOperation(app: Express, operation: Operation) {
    app.post(`/${operation.route}`, (request: Request, response: Response) => {
        OperationFactory.createOperation(operation, request, response);
    });
}

function addPutOperation(app: Express, operation: Operation) {
    app.put(`/${operation.route}`, (request: Request, response: Response) => {
        OperationFactory.createOperation(operation, request, response);
    });
}

function addDeleteOperation(app: Express, operation: Operation) {
    app.delete(`/${operation.route}`, (request: Request, response: Response) => {
        OperationFactory.createOperation(operation, request, response);
    });
}

app.listen(PORT, null, () => {
    console.log(`Server started at port ${PORT}`);
});