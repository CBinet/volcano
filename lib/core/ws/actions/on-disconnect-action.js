"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_action_factory_1 = require("./ws-action-factory");
const ws_action_enum_1 = require("./ws-action.enum");
function OnDisconnect(middlewares) {
    return ws_action_factory_1.WsActionFactory.createOperation('onDisconnect', ws_action_enum_1.WsAction.OnDisconnect, middlewares);
}
exports.OnDisconnect = OnDisconnect;
//# sourceMappingURL=on-disconnect-action.js.map