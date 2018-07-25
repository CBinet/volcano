import { WsOperation } from "./ws-operation";

export class WsOperationRegister {

    private static operations: Map<string, WsOperation> = new Map<string, WsOperation>();

    static register(operation: WsOperation) {
        WsOperationRegister.operations.set(operation.route, operation);
    }

    static resolve(operationName: string): WsOperation {
        return WsOperationRegister.operations.get(operationName);
    }

    static get(): WsOperation[] {
        const operations = []
        WsOperationRegister
        .operations
        .forEach((operation,key) => operations.push(operation));
        return operations;
    }
}