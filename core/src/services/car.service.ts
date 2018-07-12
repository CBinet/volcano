import { Injectable } from "../core/injection/decorators/injectable.decorator";
import { Car } from "../common/models/car";

@Injectable(CarService)
export class CarService {

    private cars: Map<string, Car> = new Map([['123', {id: '123', model: 'Toyota', year: 2002}]]);

    findAll(): Car[] {
        const cars = [];
        this.cars.forEach((car, key) => {
            cars.push(car);
        });
        return cars;
    }

    find(id: string): Car {
        return this.cars.get(id);
    }

    add(id: string, car: Car): void {
        car.id = id;
        this.cars.set(id, car);
    }

    update(id: string, car: Car): void {
        const updatedCar = this.cars.get(id);
        if (car.model) updatedCar.model = car.model;
        if (car.year) updatedCar.year = car.year;
        this.cars.set(id, updatedCar);
    }

    delete(id: string): void {
        throw new Error(`Car with id->${id} not found`);
        this.cars.delete(id);
    }
}