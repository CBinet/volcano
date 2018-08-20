import { HttpAction } from '../actions/http-action.enum';
import { HttpMiddleware } from '../middlewares/http-middleware';
export interface HttpOperation {
    async: boolean;
    action: HttpAction;
    route: string;
    operationName: string;
    controller: string;
    params: any[];
    function: Function;
    middlewares: HttpMiddleware[];
}
