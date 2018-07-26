"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_action_factory_1 = require("./ws-action-factory");
const ws_action_enum_1 = require("./ws-action.enum");
function OnConnect(middlewares) {
    return ws_action_factory_1.WsActionFactory.createOperation('onConnect', ws_action_enum_1.WsAction.OnConnect, middlewares);
}
exports.OnConnect = OnConnect;
//# sourceMappingURL=on-connect-action.decorator.js.map