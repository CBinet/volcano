"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_http_module_1 = require("../../core/http/volcano-http.module");
let TextController = class TextController extends volcano_http_module_1.HttpController {
    getTexts() {
        return new volcano_http_module_1.TextResult(volcano_http_module_1.HttpStatusCode.OK, 'Hello world !');
    }
};
__decorate([
    volcano_http_module_1.GET('texts')
], TextController.prototype, "getTexts", null);
TextController = __decorate([
    volcano_http_module_1.Controller()
], TextController);
exports.TextController = TextController;
//# sourceMappingURL=text-controller.js.map