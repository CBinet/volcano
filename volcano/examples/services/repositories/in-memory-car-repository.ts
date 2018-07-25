import { Injectable } from '../../../core/injection/decorators/injectable.decorator';
import { Car } from '../../common/models/car';
import { CarRepository } from './car-repository';

@Injectable(CarRepository)
export class InMemoryCarRepository extends CarRepository {

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

    add(car: Car): void {
        this.cars.set(car.id, car);
    }

    update(id: string, car: Car): void {
        const updatedCar = this.cars.get(id);
        if (car.model) updatedCar.model = car.model;
        if (car.year) updatedCar.year = car.year;
        this.cars.set(id, updatedCar);
    }

    delete(id: string): void {
        this.cars.delete(id);
    }
    
}