import { Car } from '../common/models/car';
import { Guard } from '../middlewares/http/guard.http-middleware';
import { Logger } from '../middlewares/http/logger.http-middleware';
import { CarService } from '../services/car.service';
import { DELETE } from '../volcano/http/actions/delete-action.decorator';
import { GET } from '../volcano/http/actions/get-action.decorator';
import { POST } from '../volcano/http/actions/post-action.decorator';
import { PUT } from '../volcano/http/actions/put-action.decorator';
import { ApiController } from '../volcano/http/controllers/api-controller';
import { Controller } from '../volcano/http/controllers/api-controller.decorator';
import { HttpStatusCode } from '../volcano/http/http-status-code.enum';
import { Middleware } from '../volcano/http/middlewares/http-middleware.decorator';
import { JsonResult } from '../volcano/http/results/json-result';
import { Inject } from '../volcano/injection/decorators/inject.decorator';

@Middleware(Logger)
@Controller()
export class CarController extends ApiController {

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