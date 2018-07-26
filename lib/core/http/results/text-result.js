"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
class TextResult extends result_1.Result {
    sendWith(response) {
        response.status(this.statusCode).send(this.content);
    }
}
exports.TextResult = TextResult;
//# sourceMappingURL=text-result.js.map