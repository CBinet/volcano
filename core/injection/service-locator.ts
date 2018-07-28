export class ServiceLocator {

    private static services: Map<string, any> = new Map<any, any>();

    static register<T extends { new(): T }>(abstract: any, concrete: any): void {
        const key: string = abstract.prototype.constructor.name.toLowerCase();

        const instance: any = new concrete();
        if (this.services.has(key)) {
            console.log(`Service already registered: ${key}.`);
        }
        this.services.set(key, instance);
    }

    static resolve<T extends { new(): T }>(abstract: any): T {
        const key: string = abstract.prototype.constructor.name.toLowerCase();
        if (!this.services.has(key)) {
            console.log(`Service is not registered: ${key}.`);
        }
        return this.services.get(key);
    }
}