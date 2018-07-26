"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ControllerRegister {
    static get() {
        return ControllerRegister.controllers;
    }
    static register(controller) {
        ControllerRegister.controllers.push(controller);
    }
    static resolve(name) {
        return ControllerRegister.controllers.find(controller => {
            return controller.constructor.name == name;
        });
    }
}
ControllerRegister.controllers = [];
exports.ControllerRegister = ControllerRegister;
//# sourceMappingURL=http-controller-register.js.map