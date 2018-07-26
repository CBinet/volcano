"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_ws_module_1 = require("../../../core/ws/volcano-ws.module");
class Logger extends volcano_ws_module_1.WsMiddleware {
    intercept(message, websocket, server) {
        console.log('I am websocket interceptor');
        return true;
    }
    ;
}
exports.Logger = Logger;
//# sourceMappingURL=logger.ws-middleware.js.map