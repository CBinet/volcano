"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const http_action_enum_1 = require("./http/actions/http-action.enum");
const http_controller_register_1 = require("./http/controllers/http-controller-register");
const http_middleware_register_1 = require("./http/middlewares/http-middleware-register");
const http_operation_factory_1 = require("./http/operations/http-operation-factory");
const http_operation_register_1 = require("./http/operations/http-operation-register");
const service_locator_1 = require("./injection/service-locator");
const ws_operation_register_1 = require("./ws/operations/ws-operation-register");
const json_websocket_response_1 = require("./ws/responses/json-websocket-response");
const server_1 = require("./ws/server/server");
class Volcano {
    static createServer(config) {
        if (config.services) {
            config.services
                .forEach(service => service_locator_1.ServiceLocator.register(service.interface, service.use));
        }
        const { server, application } = Volcano.expressInitialize();
        const wsOperations = ws_operation_register_1.WsOperationRegister.get();
        wsOperations.forEach(Volcano.registerWebsocketOperation(server));
        const operations = [];
        http_operation_register_1.HttpOperationRegister.get().forEach(value => operations.push(value));
        operations.forEach(Volcano.registerHttpOperation(application));
        return server;
    }
    static expressInitialize() {
        const application = express();
        application.use(bodyParser.json());
        const server = http.createServer(application);
        return { server, application };
    }
    static registerWebsocketOperation(server) {
        return (operation) => {
            const websocketServer = new server_1.Server({
                server,
                path: operation.route
            });
            websocketServer.on('connection', (websocket) => {
                const optionalParams = [websocket, websocketServer];
                const controller = http_controller_register_1.ControllerRegister.resolve(operation.controller);
                const controllerMiddlewares = http_middleware_register_1.HttpMiddlewareRegister.resolve(operation.controller, operation.route);
                let operationMiddlewares = operation.onConnect.middlewares ? operation.onConnect.middlewares : [];
                operationMiddlewares = controllerMiddlewares.concat(operationMiddlewares);
                Volcano.callOnConnect(controller, operation, operationMiddlewares, websocket, websocketServer, optionalParams);
                websocket.on('message', (rawMessage) => {
                    const message = JSON.parse(rawMessage);
                    let operationMiddlewares = operation.onMessage[message.message].middlewares ? operation.onMessage[message.message].middlewares : [];
                    operationMiddlewares = controllerMiddlewares.concat(operationMiddlewares);
                    Volcano.callOnMessage(controller, operation, operationMiddlewares, message, websocket, websocketServer);
                });
                websocket.on('close', () => {
                    Volcano.callOnDisconnect(controller, operation, operationMiddlewares, websocket, websocketServer, optionalParams);
                });
            });
        };
    }
    static callOnMessage(controller, operation, middlewares, message, websocket, websocketServer) {
        var responseSent = this.applyMiddlewares(middlewares, message, websocket, websocketServer);
        if (!responseSent) {
            const innerFunction = operation.onMessage[message.message];
            const params = this.extractMessageParameters(innerFunction.params, message.content).filter(param => param);
            params.push(websocket, websocketServer);
            try {
                const onMessageResult = innerFunction.function.apply(controller, params);
                onMessageResult.sendWith(websocketServer, websocket);
            }
            catch (error) {
                const errorResult = new json_websocket_response_1.JsonWebsocketResponse({ error: error.message }, false, [websocket]);
                errorResult.sendWith(websocketServer, websocket);
            }
        }
    }
    static callOnConnect(controller, operation, middlewares, websocket, websocketServer, optionalParams) {
        var responseSent = this.applyMiddlewares(middlewares, null, websocket, websocketServer);
        if (!responseSent) {
            try {
                const onConnectResult = operation.onConnect.function.apply(controller, optionalParams);
                onConnectResult.sendWith(websocketServer, websocket);
            }
            catch (error) {
                const errorResult = new json_websocket_response_1.JsonWebsocketResponse({ error: error.message }, false, [websocket]);
                errorResult.sendWith(websocketServer, websocket);
            }
        }
    }
    static callOnDisconnect(controller, operation, middlewares, websocket, websocketServer, optionalParams) {
        var responseSent = this.applyMiddlewares(middlewares, null, websocket, websocketServer);
        if (!responseSent) {
            try {
                const onConnectResult = operation.onDisconnect.function.apply(controller, optionalParams);
                onConnectResult.sendWith(websocketServer, websocket);
            }
            catch (error) {
                const errorResult = new json_websocket_response_1.JsonWebsocketResponse({ error: error.message }, false, [websocket]);
                errorResult.sendWith(websocketServer, websocket);
            }
        }
    }
    static applyMiddlewares(middlewares, message, websocket, server) {
        var responseSent = false;
        middlewares.reverse().forEach((middleware) => {
            responseSent = responseSent == true ? true : !middleware.intercept(message, websocket, server);
        });
        return responseSent;
    }
    static extractMessageParameters(params, content) {
        let extractedParams = [];
        params.forEach(param => {
            extractedParams.push(content[param]);
        });
        return extractedParams;
    }
    static registerHttpOperation(application) {
        return (operation) => {
            const route = `/${operation.route}`;
            switch (operation.action) {
                case http_action_enum_1.HttpAction.GET:
                    {
                        application.get(route, Volcano.createHttpOperation(operation));
                        break;
                    }
                case http_action_enum_1.HttpAction.POST:
                    {
                        application.post(route, Volcano.createHttpOperation(operation));
                        break;
                    }
                case http_action_enum_1.HttpAction.PUT:
                    {
                        application.put(route, Volcano.createHttpOperation(operation));
                        break;
                    }
                case http_action_enum_1.HttpAction.DELETE:
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
    static createHttpOperation(operation) {
        return (request, response) => {
            http_operation_factory_1.HttpOperationFactory.createOperation(operation, request, response);
        };
    }
}
exports.Volcano = Volcano;
//# sourceMappingURL=volcano.js.map