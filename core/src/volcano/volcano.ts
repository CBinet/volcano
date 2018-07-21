import bodyParser = require('body-parser');
import express = require('express');
import { Express, Request, Response } from 'express-serve-static-core';
import * as http from 'http';
import * as WebSocket from 'ws';

import { HttpAction } from './http/actions/http-action.enum';
import { ControllerRegister } from './http/controllers/api-controller-register';
import { HttpOperation } from './http/operations/http-operation';
import { HttpOperationFactory } from './http/operations/http-operation-factory';
import { HttpOperationRegister } from './http/operations/http-operation-register';
import { VolcanoConfig } from './volcano.config';
import { Message } from './ws/messages/message';
import { WsOperation } from './ws/operations/ws-operation';
import { WsOperationRegister } from './ws/operations/ws-operation-register';
import { WebsocketResponse } from './ws/responses/websocket-response';
import { HttpMiddlewareRegister } from './http/middlewares/http-middleware-register';
import { HttpMiddleware } from './http/middlewares/http-middleware';
import { Websocket } from './ws/server/websocket';
import { Server } from './ws/server/server';
import { WsMiddleware } from './ws/middlewares/ws-middleware';

export class Volcano {

    static createServer(config?: VolcanoConfig) {
        const { server, application }: { server: http.Server; application: Express; } = Volcano.expressInitialize();

        const wsOperations: WsOperation[] = WsOperationRegister.get();
        wsOperations.forEach(Volcano.registerWebsocketOperation(server));

        const operations: HttpOperation[] = [];
        HttpOperationRegister.get().forEach(value => operations.push(value));
        operations.forEach(Volcano.registerHttpOperation(application));

        return server;
    }

    private static expressInitialize() {
        const application: Express = express();
        application.use(bodyParser.json());
        const server = http.createServer(application);
        return { server, application };
    }

    private static registerWebsocketOperation(server: http.Server): (value: WsOperation, index: number, array: WsOperation[]) => void {
        return (operation: WsOperation) => {
            const websocketServer = new WebSocket.Server({
                server,
                path: operation.route
            });
            websocketServer.on('connection', (websocket: WebSocket) => {

                const optionalParams = [websocket, websocketServer];
                const controller = ControllerRegister.resolve(operation.controller);
                const controllerMiddlewares = HttpMiddlewareRegister.resolve(operation.controller, operation.route);

                let operationMiddlewares = operation.onConnect.middlewares ? operation.onConnect.middlewares : [];
                operationMiddlewares = controllerMiddlewares.concat(operationMiddlewares);
                console.log(operationMiddlewares);
                Volcano.callOnConnect(controller, operation, operationMiddlewares, websocket, websocketServer, optionalParams);

                websocket.on('message', (rawMessage: string) => {
                    const message: Message = JSON.parse(rawMessage);
                    Volcano.callOnMessage(controller, operation, message, websocket, websocketServer);
                });

                websocket.on('close', () => {
                    const onDisconnectResult: WebsocketResponse = operation.onDisconnect.function.apply(controller, optionalParams);
                    onDisconnectResult.sendWith(websocketServer, websocket); // TODO : Check why it shits
                });

            });
        };
    }

    private static callFunction(controller: any, operation: WsOperation, message: Message, websocket: WebSocket, websocketServer: WebSocket.Server) {
        const innerFunction = operation.onMessage[message.message];
        const params = this.extractMessageParameters(innerFunction.params, message.content).filter(param => param);
        params.push(websocket, websocketServer);
        const onMessageResult: WebsocketResponse = innerFunction.function.apply(controller, params);
        onMessageResult.sendWith(websocketServer, websocket);
    }

    private static callOnMessage(controller: any, operation: WsOperation, message: Message, websocket: WebSocket, websocketServer: WebSocket.Server) {
        const innerFunction = operation.onMessage[message.message];
        const params = this.extractMessageParameters(innerFunction.params, message.content).filter(param => param);
        params.push(websocket, websocketServer);
        const onMessageResult: WebsocketResponse = innerFunction.function.apply(controller, params);
        onMessageResult.sendWith(websocketServer, websocket);
    }

    private static callOnConnect(controller: any, operation: WsOperation, middlewares: any[], websocket: WebSocket, websocketServer: WebSocket.Server, optionalParams: (WebSocket | WebSocket.Server)[]) {
        var responseSent: boolean = this.applyMiddlewares(middlewares, null, <Websocket>websocket, websocketServer);
        if (!responseSent) {
            const onConnectResult: WebsocketResponse = operation.onConnect.function.apply(controller, optionalParams);
            onConnectResult.sendWith(websocketServer, websocket);
        }
    }

    private static applyMiddlewares(middlewares: WsMiddleware[], message: Message, websocket: Websocket, server: Server): boolean {
        var responseSent: boolean = false;
        middlewares.reverse().forEach((middleware: WsMiddleware) => {
            responseSent = responseSent == true ? true : !middleware.intercept(message, websocket, server);
        });
        return responseSent;
    }

    private static extractMessageParameters(params: string[], content: object): any[] {
        let extractedParams = [];
        params.forEach(param => {
            extractedParams.push(content[param]);
        });
        return extractedParams;
    }

    private static registerHttpOperation(application: Express): (value: HttpOperation, index: number, array: HttpOperation[]) => void {

        return (operation: HttpOperation) => {

            const route: string = `/${operation.route}`;

            switch (operation.action) {
                case HttpAction.GET:
                {
                    application.get(route, Volcano.createHttpOperation(operation));
                    break;
                }
                case HttpAction.POST:
                {
                    application.post(route, Volcano.createHttpOperation(operation));
                    break;
                }
                case HttpAction.PUT:
                {
                    application.put(route, Volcano.createHttpOperation(operation));
                    break;
                }
                case HttpAction.DELETE:
                {
                    application.delete(route, Volcano.createHttpOperation(operation));
                    break;
                }
                default:
                {
                    throw new Error(`Unknown Http action: ${operation.action}`);
                }
            }
        };
    }

    private static createHttpOperation(operation: HttpOperation) {
        return (request: Request, response: Response) => {
            HttpOperationFactory.createOperation(operation, request, response);
        };
    }

}