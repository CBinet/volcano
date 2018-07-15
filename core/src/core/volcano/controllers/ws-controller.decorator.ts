import { ControllerRegister } from "./api-controller-register";
import { WsController } from "./ws-controller";

export const WebsocketController = () : (target: any) => void => {
    return (target: any) => {
        const controller: WsController = new target();
        ControllerRegister.register(controller);
    };

}