"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_action_factory_1 = require("./ws-action-factory");
const ws_action_enum_1 = require("./ws-action.enum");
function On(operationKey, middlewares) {
    return ws_action_factory_1.WsActionFactory.createOperation(operationKey, ws_action_enum_1.WsAction.OnMessage, middlewares);
}
exports.On = On;
//# sourceMappingURL=on-action.decorator.js.map