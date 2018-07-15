import { FunctionSignature } from './function-signature';

export interface WsOperation {
    route: string;
    operationName: string;
    controller: string;
    onConnect: () => any;
    onMessage: Map<string, FunctionSignature>;
    onDisconnect: () => any;
}