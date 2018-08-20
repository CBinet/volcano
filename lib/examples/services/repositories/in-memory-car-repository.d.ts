import { Car } from '../../common/models/car';
import { CarRepository } from './car-repository';
export declare class InMemoryCarRepository extends CarRepository {
    private cars;
    findAll(): Promise<Car[]>;
    find(id: string): Car;
    add(car: Car): void;
    update(id: string, car: Car): void;
    delete(id: string): void;
}
