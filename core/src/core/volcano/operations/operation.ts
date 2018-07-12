import { HttpAction } from '../../http/http-action.enum';

export interface Operation {
    action: HttpAction;
    route: string;
    operationName: string;
    controller: string;
    params: any[];
    function: Function;
}