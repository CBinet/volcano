"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_controller_register_1 = require("../../http/controllers/http-controller-register");
exports.WebsocketController = (route) => {
    return (target) => {
        const controller = new target(route);
        http_controller_register_1.ControllerRegister.register(controller);
    };
};
//# sourceMappingURL=ws-controller.decorator.js.map