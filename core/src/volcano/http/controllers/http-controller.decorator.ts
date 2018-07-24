import { HttpController } from "./http-controller";
import { ControllerRegister } from "./http-controller-register";

export const Controller = () : (target: any) => void => {
    return (target: any) => {
        const controller: HttpController = new target();
        ControllerRegister.register(controller);
    };

}