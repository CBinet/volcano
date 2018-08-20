import { Car } from "../../common/models/car";
export declare abstract class CarRepository {
    abstract findAll(): Promise<Car[]>;
    abstract find(id: string): Car;
    abstract add(car: Car): void;
    abstract update(id: string, car: Car): void;
    abstract delete(id: string): void;
}
