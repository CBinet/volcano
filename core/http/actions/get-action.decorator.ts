import { HttpActionFactory } from "./http-action-factory";
import { HttpAction } from "./http-action.enum";
import { HttpMiddleware } from "../middlewares/http-middleware";

export function GET(route: string, middlewares?: typeof HttpMiddleware[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return HttpActionFactory.createOperation(HttpAction.GET, route, middlewares);
}