import { HttpOperation } from "./http-operation";

export class HttpOperationRegister {

    private static operations: Map<string, HttpOperation> = new Map<string, HttpOperation>();

    static register(operation: HttpOperation) {
        HttpOperationRegister.operations.set(`${operation.action}/${operation.route}`, operation);
    }

    static get(): Map<string, HttpOperation> {
        return HttpOperationRegister.operations;
    }
}