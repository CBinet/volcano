"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
class JsonResult extends result_1.Result {
    sendWith(response) {
        response.status(this.statusCode).json(this.content);
    }
}
exports.JsonResult = JsonResult;
//# sourceMappingURL=json-result.js.map