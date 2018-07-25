"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_locator_1 = require("../service-locator");
function Injectable(abstract) {
    return (target) => {
        service_locator_1.ServiceLocator.register(abstract, target);
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.decorator.js.map