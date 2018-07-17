import { ApiController } from "./api-controller";

export class ControllerRegister {
    
    private static controllers: any[] = [];

    static get(): any[] {
        return ControllerRegister.controllers;
    }

    static register(controller: any) {
        ControllerRegister.controllers.push(controller);
    }

    static resolve(name: string): any {
        return ControllerRegister.controllers.find(controller => {
            return controller.constructor.name == name; 
        });
    }
}