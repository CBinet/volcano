"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(statusCode, content) {
        this.statusCode = statusCode;
        this.content = content;
    }
    static create(statusCode, content) {
        throw new Error("Method not implemented.");
    }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map