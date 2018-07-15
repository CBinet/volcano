import { HttpAction } from '../../../http/http-action.enum';

export interface HttpOperation {
    action: HttpAction;
    route: string;
    operationName: string;
    controller: string;
    params: any[];
    function: Function;
}