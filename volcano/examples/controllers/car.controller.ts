import {
    Controller,
    DELETE,
    GET,
    HttpController,
    HttpStatusCode,
    JsonResult,
    Middleware,
    POST,
    PUT,
} from '../../core/http/volcano-http.module';
import { Inject } from '../../core/injection/volcano-injection.module';
import { Car } from '../common/models/car';
import { Guard } from '../middlewares/http/guard.http-middleware';
import { Logger } from '../middlewares/http/logger.http-middleware';
import { CarService } from '../services/car.service';

@Middleware(Logger)
@Controller()
export class CarController extends HttpController {

    @Inject(CarService) private carService: CarService;

    @GET('cars')
    getCars(): JsonResult {
        const cars = this.carService.findAll();
        return new JsonResult(HttpStatusCode.OK, cars);
    }

    @GET('cars/:id')
    getCar(id: string): JsonResult {
        const car = this.carService.find(id);
        if (!car) return new JsonResult(HttpStatusCode.NOT_FOUND, {id});
        return new JsonResult(HttpStatusCode.OK, car);
    }

    @POST('cars', [Guard])
    addCar(car: Car): JsonResult {
        this.carService.add(car);
        return new JsonResult(HttpStatusCode.CREATED);
    }

    @PUT('cars/:id', [Guard])
    updateCar(id: string, car: Car): JsonResult {
        this.carService.update(id, car);
        return new JsonResult(HttpStatusCode.ACCEPTED);
    }

    @DELETE('cars/:id', [Guard])
    deleteCar(id: string): JsonResult {
        this.carService.delete(id);
        return new JsonResult(HttpStatusCode.ACCEPTED);
    }
}