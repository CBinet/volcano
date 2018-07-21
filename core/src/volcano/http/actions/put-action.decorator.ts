import { HttpActionFactory } from "./http-action-factory";
import { HttpAction } from "./http-action.enum";
import { HttpMiddleware } from "../middlewares/http-middleware";

export function PUT(route: string, middlewares?: typeof HttpMiddleware[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return HttpActionFactory.createOperation(HttpAction.PUT, route, middlewares);
}