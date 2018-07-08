import 'reflect-metadata';
import {ServiceLocator} from "../service-locator";

// tslint:disable-next-line:no-any
export function Injectable(abstract): (target: any) => void {
    // tslint:disable-next-line:no-any
    return (target: any) => {
        ServiceLocator.register(abstract, target);
    };
}