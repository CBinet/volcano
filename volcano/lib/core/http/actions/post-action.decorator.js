"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_action_enum_1 = require("./http-action.enum");
const http_action_factory_1 = require("./http-action-factory");
function POST(route, middlewares) {
    return http_action_factory_1.HttpActionFactory.createOperation(http_action_enum_1.HttpAction.POST, route, middlewares);
}
exports.POST = POST;
//# sourceMappingURL=post-action.decorator.js.map