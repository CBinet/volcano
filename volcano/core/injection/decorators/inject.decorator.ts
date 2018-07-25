import {ServiceLocator} from "../service-locator";

export function Inject(abstract: any): (target: any, property: string) => void {
    return (target: any, property: string) => {
        setTimeout(() => {
            target[property] = ServiceLocator.resolve(abstract);
        }, 500);
    };
}