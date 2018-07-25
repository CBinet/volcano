"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_action_factory_1 = require("./http-action-factory");
const http_action_enum_1 = require("./http-action.enum");
function PUT(route, middlewares) {
    return http_action_factory_1.HttpActionFactory.createOperation(http_action_enum_1.HttpAction.PUT, route, middlewares);
}
exports.PUT = PUT;
//# sourceMappingURL=put-action.decorator.js.map