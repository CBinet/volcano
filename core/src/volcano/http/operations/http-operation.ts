import { HttpAction } from '../actions/http-action.enum';
import { Middleware } from '../../middlewares/middleware';

export interface HttpOperation {
    action: HttpAction;
    route: string;
    operationName: string;
    controller: string;
    params: any[];
    function: Function;
    middlewares: Middleware[]
}