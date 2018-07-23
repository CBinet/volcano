import {Logger} from "../logger/logger.service";
import {LogType} from "../logger/log-type.enum";

export class ServiceLocator {
    static has(arg0: any): any {
        
    }

    // tslint:disable-next-line:no-any
    private static services: Map<string, any> = new Map<any, any>();

    // tslint:disable-next-line:no-any
    static register<T extends { new(): T }>(abstract: any, concrete: any): void {
        console.log('REGISTERING:', abstract.prototype.constructor.name, concrete.name, this.services);
        const key: string = abstract.prototype.constructor.name.toLowerCase();
        // tslint:disable-next-line:no-any
        const instance: any = new concrete();
        if (this.services.has(key)) {
            console.log(`Service already registered: ${key}.`, LogType.ERROR);
        }
        this.services.set(key, instance);
    }

    static resolve<T extends { new(): T }>(abstract: any): T {
        console.log('RESOLVING:', abstract.prototype.constructor.name, this.services);
        const key: string = abstract.prototype.constructor.name.toLowerCase();
        if (!this.services.has(key)) {
            throw new Error(`Service is not registered: ${key}.`);
        }
        return this.services.get(key);
    }
}