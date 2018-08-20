import { Car } from '../common/models/car';
export declare class CarService {
    private carRepository;
    findAll(): Promise<Car[]>;
    find(id: string): Car;
    add(car: Car): void;
    update(id: string, car: Car): void;
    delete(id: string): void;
}
