import { Car } from '../common/models/car';
import { Injectable } from '../../core/injection/decorators/injectable.decorator';
import { Inject } from '../../core/injection/decorators/inject.decorator';
import { CarRepository } from './repositories/car-repository';

@Injectable(CarService)
export class CarService {

    @Inject(CarRepository) private carRepository: CarRepository;

    async findAll(): Promise<Car[]> {
        const cars = await this.carRepository.findAll();
        return cars;
    }

    find(id: string): Car {
        return this.carRepository.find(id);
    }

    add(car: Car): void {
        this.carRepository.add(car);
    }

    update(id: string, car: Car): void {
        this.carRepository.update(id, car);
    }

    delete(id: string): void {
        this.carRepository.delete(id);
    }
}