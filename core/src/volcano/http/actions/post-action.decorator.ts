import { HttpAction } from "./http-action.enum";
import { HttpActionFactory } from "./http-action-factory";
import { HttpMiddleware } from "../middlewares/http-middleware";

export function POST(route: string, middlewares?: typeof HttpMiddleware[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return HttpActionFactory.createOperation(HttpAction.POST, route, middlewares);
}
