export declare class ControllerRegister {
    private static controllers;
    static get(): any[];
    static register(controller: any): void;
    static resolve(name: string): any;
}
