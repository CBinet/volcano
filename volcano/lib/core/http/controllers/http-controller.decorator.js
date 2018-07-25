"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_controller_register_1 = require("./http-controller-register");
exports.Controller = () => {
    return (target) => {
        const controller = new target();
        http_controller_register_1.ControllerRegister.register(controller);
    };
};
//# sourceMappingURL=http-controller.decorator.js.map