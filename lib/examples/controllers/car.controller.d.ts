import { HttpController, Result, Request, Response } from '../../core/http/volcano-http.module';
import { Car } from '../common/models/car';
export declare class CarController extends HttpController {
    private carService;
    getCars(request: Request, response: Response): Promise<Result>;
    getCar(id: string): Result;
    addCar(car: Car): Result;
    updateCar(id: string, car: Car): Result;
    deleteCar(id: string): Result;
}
