"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var CarService_1;
const injectable_decorator_1 = require("../../core/injection/decorators/injectable.decorator");
const inject_decorator_1 = require("../../core/injection/decorators/inject.decorator");
const car_repository_1 = require("./repositories/car-repository");
let CarService = CarService_1 = class CarService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield this.carRepository.findAll();
            return cars;
        });
    }
    find(id) {
        return this.carRepository.find(id);
    }
    add(car) {
        this.carRepository.add(car);
    }
    update(id, car) {
        this.carRepository.update(id, car);
    }
    delete(id) {
        this.carRepository.delete(id);
    }
};
__decorate([
    inject_decorator_1.Inject(car_repository_1.CarRepository)
], CarService.prototype, "carRepository", void 0);
CarService = CarService_1 = __decorate([
    injectable_decorator_1.Injectable(CarService_1)
], CarService);
exports.CarService = CarService;
//# sourceMappingURL=car.service.js.map