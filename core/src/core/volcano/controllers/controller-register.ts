import { ApiController } from "./api-controller";

export class ControllerRegister {
    
    private static controllers: ApiController[] = [];

    static get(): ApiController[] {
        return ControllerRegister.controllers;
    }

    static register(controller: ApiController) {
        ControllerRegister.controllers.push(controller);
    }

    static resolve(name: string): ApiController {
        return ControllerRegister.controllers.find(controller => {
            return controller.constructor.name == name; 
        });
    }
}