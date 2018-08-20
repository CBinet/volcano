export declare class ServiceLocator {
    private static services;
    static register<T extends {
        new (): T;
    }>(abstract: any, concrete: any): void;
    static resolve<T extends {
        new (): T;
    }>(abstract: any): T;
}
