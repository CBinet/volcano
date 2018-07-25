"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_action_factory_1 = require("./http-action-factory");
const http_action_enum_1 = require("./http-action.enum");
function GET(route, middlewares) {
    return http_action_factory_1.HttpActionFactory.createOperation(http_action_enum_1.HttpAction.GET, route, middlewares);
}
exports.GET = GET;
//# sourceMappingURL=get-action.decorator.js.map