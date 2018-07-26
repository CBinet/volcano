"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xml = require('xml');
const result_1 = require("./result");
class XmlResult extends result_1.Result {
    sendWith(response) {
        response.set('Content-Type', 'text/xml');
        response.status(this.statusCode).send(xml(this.content));
    }
}
exports.XmlResult = XmlResult;
//# sourceMappingURL=xml-result.js.map