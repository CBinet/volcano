import { HttpActionFactory } from "./http-action-factory";
import { HttpAction } from "./http-action.enum";

export function PUT(route?: string) {
    return HttpActionFactory.createOperation(HttpAction.PUT, route);
}