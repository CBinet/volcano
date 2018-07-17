import bodyParser = require('body-parser');
import express = require('express');
import { Express, Request, Response } from 'express-serve-static-core';
import * as http from 'http';
import * as WebSocket from 'ws';

import { CarController } from './controllers/car.controller';
import { ChatController } from './controllers/chat.controller';
import { LegacyController } from './controllers/legacy.controller';
import { PagesController } from './controllers/pages.controller';
import { PingController } from './controllers/ping.controller';
import { TextController } from './controllers/text-controller';
import { Guard } from './middlewares/guard.middleware';
import { Logger } from './middlewares/logger.middleware';
import { HttpAction } from './volcano/http/actions/http-action.enum';
import { HttpOperation } from './volcano/http/operations/http-operation';
import { HttpOperationFactory } from './volcano/http/operations/http-operation-factory';
import { HttpOperationRegister } from './volcano/http/operations/http-operation-register';
import { Message } from './volcano/ws/messages/message';
import { WsOperation } from './volcano/ws/operations/ws-operation';
import { WsOperationRegister } from './volcano/ws/operations/ws-operation-register';
import { WebsocketResponse } from './volcano/ws/responses/websocket-response';

const app: Express = express();
app.use(bodyParser.json());
const PORT = 3000;

const server = http.createServer(app);

const wsOperations: WsOperation[] = WsOperationRegister.get();

wsOperations.forEach(operation => {

    const wss = new WebSocket.Server({ server, path: operation.route });

    wss.on('connection', (ws: WebSocket) => {

        ws.on('message', (rawMessage: string) => {
            const message: Message = JSON.parse(rawMessage);
            console.log('received: %s', rawMessage);
            const innerFunction = operation.onMessage[message.message];
            const params = extractParameters(innerFunction.params, message.content);
            params.push(wss);
            const result: WebsocketResponse = innerFunction.function.apply(this, params);
            result.sendWith(wss, ws);
        });

        ws.on('close', () => {
            // ws.send(operation.onDisconnect()); // TODO : Check why it shits
        });

        const onConnect = operation.onConnect();
        onConnect.sendWith(wss, ws);
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
    params.forEach(param => {
        extractedParams.push(content[param])
    });
    return extractedParams;
};