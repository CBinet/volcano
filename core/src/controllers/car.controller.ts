import { Car } from '../common/models/car';
import { DELETE } from '../core/http/actions/delete-action.decorator';
import { GET } from '../core/http/actions/get-action.decorator';
import { POST } from '../core/http/actions/post-action.decorator';
import { PUT } from '../core/http/actions/put-action.decorator';
import { HttpStatusCode } from '../core/http/http-status-code.enum';
import { JsonResult } from '../core/http/results/json-result';
import { Inject } from '../core/injection/decorators/inject.decorator';
import { ApiController } from '../core/volcano/controllers/api-controller';
import { Controller } from '../core/volcano/controllers/api-controller.decorator';
import { CarService } from '../services/car.service';

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

    @POST('cars')
    addCar(car: Car): JsonResult {
        this.carService.add(car);
        return new JsonResult(HttpStatusCode.CREATED);
    }

    @PUT('cars/:id')
    updateCar(id: string, car: Car): JsonResult {
        this.carService.update(id, car);
        return new JsonResult(HttpStatusCode.ACCEPTED);
    }

    @DELETE('cars/:id')
    deleteCar(id: string): JsonResult {
        this.carService.delete(id);
        return new JsonResult(HttpStatusCode.ACCEPTED);
    }
}