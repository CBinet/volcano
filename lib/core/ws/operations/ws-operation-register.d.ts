import { WsOperation } from "./ws-operation";
export declare class WsOperationRegister {
    private static operations;
    static register(operation: WsOperation): void;
    static resolve(operationName: string): WsOperation;
    static get(): WsOperation[];
}
