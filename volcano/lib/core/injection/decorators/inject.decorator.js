"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_locator_1 = require("../service-locator");
function Inject(abstract) {
    return (target, property) => {
        setTimeout(() => {
            target[property] = service_locator_1.ServiceLocator.resolve(abstract);
        }, 500);
    };
}
exports.Inject = Inject;
//# sourceMappingURL=inject.decorator.js.map