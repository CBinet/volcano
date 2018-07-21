import { HttpAction } from '../actions/http-action.enum';
import { HttpMiddleware } from '../middlewares/http-middleware';

export interface HttpOperation {
    action: HttpAction;
    route: string;
    operationName: string;
    controller: string;
    params: any[];
    function: Function;
    middlewares: HttpMiddleware[]
}