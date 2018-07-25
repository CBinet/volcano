import {ServiceLocator} from "../service-locator";

export function Injectable(abstract): (target: any) => void {
    return (target: any) => {
        ServiceLocator.register(abstract, target);
    };
}