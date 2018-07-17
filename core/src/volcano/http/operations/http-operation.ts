import { HttpAction } from '../actions/http-action.enum';

export interface HttpOperation {
    action: HttpAction;
    route: string;
    operationName: string;
    controller: string;
    params: any[];
    function: Function;
}