import { HttpActionFactory } from "./http-action-factory";
import { HttpAction } from "./http-action.enum";

export function DELETE(route?: string) {
    return HttpActionFactory.createOperation(HttpAction.DELETE, route);
}