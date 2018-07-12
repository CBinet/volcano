import { ApiController } from "./api-controller";
import { ControllerRegister } from "./controller-register";

export const Controller = () : (target: any) => void => {
    return (target: any) => {
        const controller: ApiController = new target();
        ControllerRegister.register(controller);
    };

}