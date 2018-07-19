import { HttpAction } from "./http-action.enum";
import { HttpActionFactory } from "./http-action-factory";
import { Middleware } from "../../middlewares/middleware";

export function POST(route: string, middlewares?: typeof Middleware[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return HttpActionFactory.createOperation(HttpAction.POST, route, middlewares);
}
