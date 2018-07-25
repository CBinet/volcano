import { ControllerRegister } from "../../http/controllers/http-controller-register";
import { WsController } from "./ws-controller";

export const WebsocketController = (route?: string) : (target: any) => void => {
    return (target: any) => {
        const controller: WsController = new target(route);
        ControllerRegister.register(controller);
    };

}