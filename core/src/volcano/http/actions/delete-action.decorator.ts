import { HttpActionFactory } from "./http-action-factory";
import { HttpAction } from "./http-action.enum";
import { Middleware } from "../../middlewares/middleware";

export function DELETE(route: string, middlewares?: typeof Middleware[]): (target, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return HttpActionFactory.createOperation(HttpAction.DELETE, route, middlewares);
}