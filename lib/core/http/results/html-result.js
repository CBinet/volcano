"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
class HtmlResult extends result_1.Result {
    sendWith(response) {
        response.status(this.statusCode).sendFile(this.content);
    }
}
exports.HtmlResult = HtmlResult;
//# sourceMappingURL=html-result.js.map