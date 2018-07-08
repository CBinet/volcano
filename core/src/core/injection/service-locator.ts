import {Logger} from "../logger/logger.service";
import {LogType} from "../logger/log-type.enum";

export class ServiceLocator {

    // tslint:disable-next-line:no-any
    private static services: Map<string, any> = new Map<any, any>();

    // tslint:disable-next-line:no-any
    static register<T extends { new(): T }>(abstract: any, concrete: any): void {
        const key: string = abstract.prototype.constructor.name.toLowerCase();
        // tslint:disable-next-line:no-any
        const instance: any = new concrete();
        if (this.services.has(key)) {
            Logger.log(`Service already registered: ${key}.`, LogType.ERROR);
        }
        this.services.set(key, instance);
    }

    static resolve<T extends { new(): T }>(abstract: any): T {
        const key: string = abstract.prototype.constructor.name.toLowerCase();
        if (!this.services.has(key)) {
            Logger.log(`Service is not registered: ${key}.`, LogType.ERROR);
        }
        return this.services.get(key);
    }
}