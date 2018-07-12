import { Operation } from "./operation";

export class OperationRegister {

    private static operations: Map<string, Operation> = new Map<string, Operation>();

    static register(operation: Operation) {
        OperationRegister.operations.set(`${operation.action}/${operation.route}`, operation);
    }

    static get(): Map<string, Operation> {
        return OperationRegister.operations;
    }
}