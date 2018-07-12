import { HttpAction } from "../http-action.enum";
import { HttpActionFactory } from "./http-action-factory";

export function POST(route?: string) {
    return HttpActionFactory.createOperation(HttpAction.POST, route);
}
