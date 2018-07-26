"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_http_module_1 = require("../../core/http/volcano-http.module");
const guard_http_middleware_1 = require("../middlewares/http/guard.http-middleware");
const logger_http_middleware_1 = require("../middlewares/http/logger.http-middleware");
let PingController = class PingController extends volcano_http_module_1.HttpController {
    ping() {
        const result = {
            date: new Date()
        };
        return new volcano_http_module_1.JsonResult(volcano_http_module_1.HttpStatusCode.OK, result);
    }
};
__decorate([
    volcano_http_module_1.GET('ping')
], PingController.prototype, "ping", null);
PingController = __decorate([
    volcano_http_module_1.Middleware(logger_http_middleware_1.Logger),
    volcano_http_module_1.Middleware(guard_http_middleware_1.Guard),
    volcano_http_module_1.Controller()
], PingController);
exports.PingController = PingController;
//# sourceMappingURL=ping.controller.js.map