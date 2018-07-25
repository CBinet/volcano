"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_http_module_1 = require("../../../core/http/volcano-http.module");
class Logger extends volcano_http_module_1.HttpMiddleware {
    intercept(request, response) {
        console.log('I am interceptor');
        return true;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.http-middleware.js.map