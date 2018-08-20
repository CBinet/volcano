/// <reference types="node" />
import { Express } from 'express-serve-static-core';
import * as http from 'http';
import { VolcanoConfig } from './volcano.config';
export declare class Volcano {
    static createServer(config?: VolcanoConfig): {
        app: Express;
        server: http.Server;
    };
    private static expressInitialize;
    private static registerWebsocketOperation;
    private static callOnMessage;
    private static callOnConnect;
    private static callOnDisconnect;
    private static applyMiddlewares;
    private static extractMessageParameters;
    private static registerHttpOperation;
    private static createHttpOperation;
}
