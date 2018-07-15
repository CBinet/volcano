import bodyParser = require('body-parser');
import express = require('express');
import * as WebSocket from 'ws';
import { Express, Request, Response } from 'express-serve-static-core';
import * as http from 'http';

import { CarController } from './controllers/car.controller';
import { PingController } from './controllers/ping.controller';
import { HttpAction } from './core/http/http-action.enum';
import { HttpOperation } from './core/volcano/operations/http/http-operation';
import { HttpOperationRegister } from './core/volcano/operations/http/http-operation-register';
import { HttpOperationFactory } from './core/volcano/operations/http/http-operation-factory';
import { PagesController } from './controllers/pages.controller';
import { LegacyController } from './controllers/legacy.controller';
import { TextController } from './controllers/text-controller';
import { Logger } from './middlewares/logger.middleware';
import { Guard } from './middlewares/guard.middleware';
import { WsOperation } from './core/volcano/operations/ws/ws-operation';
import { ChatController } from './controllers/chat.controller';
import { Message } from './core/ws/messages/message';
import { ControllerRegister } from './core/volcano/controllers/api-controller-register';
import { WsOperationRegister } from './core/volcano/operations/ws/ws-operation-register';

const app: Express = express();
app.use(bodyParser.json());
const PORT = 3000;

const server = http.createServer(app);

// const wsOperations: WsOperation[] = [
//     {
//         route: '/chat',
//         controller: 'ChatController',
//         operationName: 'operationName',
//         onConnect: () => {return 'Welcome'},
//         onMessage: new Map([
//             ['all', {
//                 function: (message) => {
//                     console.log(message)
//                     return {person: 'all', message};
//                 },
//                 params: ['message']
//             }],
//             ['whisper', {
//                 function: (person, message) => {
//                     console.log(message)
//                     return {person: person, message};
//                 },
//                 params: ['person', 'message']
//             }],
//         ]),
//         onDisconnect: () => {return 'Goodbye'}
//     }
// ];

const wsOperations: WsOperation[] = WsOperationRegister.get();

wsOperations.forEach(operation => {

    const wss = new WebSocket.Server({ server, path: operation.route });

    wss.on('connection', (ws: WebSocket) => {

        ws.on('message', (rawMessage: string) => {
            const message: Message = JSON.parse(rawMessage);
            console.log('received: %s', rawMessage);
            const innerFunction = operation.onMessage.get(message.message);
            const params = extractParameters(innerFunction.params, message.content);
            params.push(wss);
            const result = innerFunction.function.apply(this, params);
            ws.send(result.message);
        });

        ws.send(operation.onConnect());
    });

});

[Logger, Guard];
[PingController, CarController, PagesController, LegacyController, TextController, ChatController];

const operations: HttpOperation[] = [];
HttpOperationRegister.get().forEach(value => operations.push(value));

operations.forEach((operation: HttpOperation) => {
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

server.listen(PORT, null, () => {
    console.log(`Server started at port ${PORT}`);
});

function addGetOperation(app: Express, operation: HttpOperation) {
    app.get(`/${operation.route}`, (request: Request, response: Response) => {
        HttpOperationFactory.createOperation(operation, request, response);
    });
}

function addPostOperation(app: Express, operation: HttpOperation) {
    app.post(`/${operation.route}`, (request: Request, response: Response) => {
        HttpOperationFactory.createOperation(operation, request, response);
    });
}

function addPutOperation(app: Express, operation: HttpOperation) {
    app.put(`/${operation.route}`, (request: Request, response: Response) => {
        HttpOperationFactory.createOperation(operation, request, response);
    });
}

function addDeleteOperation(app: Express, operation: HttpOperation) {
    app.delete(`/${operation.route}`, (request: Request, response: Response) => {
        HttpOperationFactory.createOperation(operation, request, response);
    });
}

function extractParameters(params: string[], content: object): any[] {
    let extractedParams = [];
    console.log(extractedParams.length);
    params.forEach(param => {
        extractedParams.push(content[param])
    });
    return extractedParams;
};