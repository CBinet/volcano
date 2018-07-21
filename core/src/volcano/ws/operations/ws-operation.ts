import { FunctionSignature } from './function-signature';

export interface WsOperation {
    route: string;
    operationName: string;
    controller: string;
    onConnect: FunctionSignature;
    onMessage: Map<string, FunctionSignature>;
    onDisconnect: FunctionSignature;
}