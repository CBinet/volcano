import { WsMiddleware } from '../middlewares/ws-middleware';

export interface FunctionSignature {
    params: string[];
    function: Function;
    middlewares: WsMiddleware[];
}