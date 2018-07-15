import { ApiController } from "./api-controller";
import { ControllerRegister } from "./api-controller-register";

export const Controller = () : (target: any) => void => {
    return (target: any) => {
        const controller: ApiController = new target();
        ControllerRegister.register(controller);
    };

}