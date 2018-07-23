import {ServiceLocator} from "../service-locator";

export function Inject(abstract: any): (target: any, property: string) => void {
    return async (target: any, property: string) => {
        // setTimeout(() => {
            
        // }, 500);
        target[property] = ServiceLocator.resolve(abstract);
    };
}