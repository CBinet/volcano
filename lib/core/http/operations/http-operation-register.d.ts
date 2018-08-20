import { HttpOperation } from "./http-operation";
export declare class HttpOperationRegister {
    private static operations;
    static register(operation: HttpOperation): void;
    static get(): Map<string, HttpOperation>;
}
