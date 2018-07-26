"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_http_module_1 = require("../../../core/http/volcano-http.module");
class Guard extends volcano_http_module_1.HttpMiddleware {
    intercept(request, response) {
        if (!request.headers.authorization) {
            response.status(401).send({ Error: 'Unauthorized access' });
            return false;
        }
        return true;
    }
}
exports.Guard = Guard;
//# sourceMappingURL=guard.http-middleware.js.map