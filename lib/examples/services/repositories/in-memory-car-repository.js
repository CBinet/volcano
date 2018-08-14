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
const injectable_decorator_1 = require("../../../core/injection/decorators/injectable.decorator");
const car_repository_1 = require("./car-repository");
let InMemoryCarRepository = class InMemoryCarRepository extends car_repository_1.CarRepository {
    constructor() {
        super(...arguments);
        this.cars = new Map([['123', { id: '123', model: 'Toyota', year: 2002 }]]);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = [];
            this.cars.forEach((car, key) => {
                cars.push(car);
            });
            return Promise.resolve(cars);
        });
    }
    find(id) {
        return this.cars.get(id);
    }
    add(car) {
        this.cars.set(car.id, car);
    }
    update(id, car) {
        const updatedCar = this.cars.get(id);
        if (car.model)
            updatedCar.model = car.model;
        if (car.year)
            updatedCar.year = car.year;
        this.cars.set(id, updatedCar);
    }
    delete(id) {
        this.cars.delete(id);
    }
};
InMemoryCarRepository = __decorate([
    injectable_decorator_1.Injectable(car_repository_1.CarRepository)
], InMemoryCarRepository);
exports.InMemoryCarRepository = InMemoryCarRepository;
//# sourceMappingURL=in-memory-car-repository.js.map