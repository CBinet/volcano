import {Logger} from "../logger.service";
import chalk from "chalk";
import {LogType} from "../log-type.enum";

const now: () => number = require("performance-now");
let depth: number = 0;

export function Log(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }
        const wrappedMethod: any | undefined = descriptor.value;

        descriptor.value = function () {
            const args: any[] = [];
            for (let _i: number = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            const a = args.map(function (a) {
                return JSON.stringify(a);
            }).join();
            Logger.log(`(${depth++}) LOG BEGIN: ${propertyKey} (${a})`, LogType.INFO);
            const t1: number = now();
            const result: any = wrappedMethod.apply(this, args); /* Usage of wrapperMethod here*/
            const t2: number = now();
            const r: string = JSON.stringify(result);
            Logger.log(`(${--depth}) LOG TIMESTOP: ${wrappedMethod.name} took ${(t2 - t1).toFixed(4)} milliseconds.`, LogType.INFO);
            Logger.log(`(${depth}) LOG END: ${propertyKey} (${a}) => ${r}`, LogType.INFO);
            return result;
        };

        return descriptor;
    };
}