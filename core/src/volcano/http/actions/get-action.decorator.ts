import { HttpActionFactory } from "./http-action-factory";
import { HttpAction } from "./http-action.enum";

export function GET(route?: string): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return HttpActionFactory.createOperation(HttpAction.GET, route);
}