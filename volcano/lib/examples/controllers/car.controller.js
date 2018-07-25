"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_http_module_1 = require("../../core/http/volcano-http.module");
const volcano_injection_module_1 = require("../../core/injection/volcano-injection.module");
const guard_http_middleware_1 = require("../middlewares/http/guard.http-middleware");
const logger_http_middleware_1 = require("../middlewares/http/logger.http-middleware");
const car_service_1 = require("../services/car.service");
let CarController = class CarController extends volcano_http_module_1.HttpController {
    getCars() {
        const cars = this.carService.findAll();
        return new volcano_http_module_1.JsonResult(volcano_http_module_1.HttpStatusCode.OK, cars);
    }
    getCar(id) {
        const car = this.carService.find(id);
        if (!car)
            return new volcano_http_module_1.JsonResult(volcano_http_module_1.HttpStatusCode.NOT_FOUND, { id });
        return new volcano_http_module_1.JsonResult(volcano_http_module_1.HttpStatusCode.OK, car);
    }
    addCar(car) {
        this.carService.add(car);
        return new volcano_http_module_1.JsonResult(volcano_http_module_1.HttpStatusCode.CREATED);
    }
    updateCar(id, car) {
        this.carService.update(id, car);
        return new volcano_http_module_1.JsonResult(volcano_http_module_1.HttpStatusCode.ACCEPTED);
    }
    deleteCar(id) {
        this.carService.delete(id);
        return new volcano_http_module_1.JsonResult(volcano_http_module_1.HttpStatusCode.ACCEPTED);
    }
};
__decorate([
    volcano_injection_module_1.Inject(car_service_1.CarService)
], CarController.prototype, "carService", void 0);
__decorate([
    volcano_http_module_1.GET('cars')
], CarController.prototype, "getCars", null);
__decorate([
    volcano_http_module_1.GET('cars/:id')
], CarController.prototype, "getCar", null);
__decorate([
    volcano_http_module_1.POST('cars', [guard_http_middleware_1.Guard])
], CarController.prototype, "addCar", null);
__decorate([
    volcano_http_module_1.PUT('cars/:id', [guard_http_middleware_1.Guard])
], CarController.prototype, "updateCar", null);
__decorate([
    volcano_http_module_1.DELETE('cars/:id', [guard_http_middleware_1.Guard])
], CarController.prototype, "deleteCar", null);
CarController = __decorate([
    volcano_http_module_1.Middleware(logger_http_middleware_1.Logger),
    volcano_http_module_1.Controller()
], CarController);
exports.CarController = CarController;
//# sourceMappingURL=car.controller.js.map