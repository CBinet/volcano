"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceLocator {
    static register(abstract, concrete) {
        const key = abstract.prototype.constructor.name.toLowerCase();
        const instance = new concrete();
        if (this.services.has(key)) {
            console.log(`Service already registered: ${key}.`);
        }
        this.services.set(key, instance);
    }
    static resolve(abstract) {
        const key = abstract.prototype.constructor.name.toLowerCase();
        if (!this.services.has(key)) {
            console.log(`Service is not registered: ${key}.`);
        }
        return this.services.get(key);
    }
}
ServiceLocator.services = new Map();
exports.ServiceLocator = ServiceLocator;
//# sourceMappingURL=service-locator.js.map