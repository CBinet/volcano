import { Car } from '../common/models/car';
import { CarService } from '../services/car.service';
import { Controller } from '../volcano/http/controllers/api-controller.decorator';
import { ApiController } from '../volcano/http/controllers/api-controller';
import { Inject } from '../volcano/injection/decorators/inject.decorator';
import { GET } from '../volcano/http/actions/get-action.decorator';
import { JsonResult } from '../volcano/http/results/json-result';
import { HttpStatusCode } from '../volcano/http/http-status-code.enum';
import { POST } from '../volcano/http/actions/post-action.decorator';
import { PUT } from '../volcano/http/actions/put-action.decorator';
import { DELETE } from '../volcano/http/actions/delete-action.decorator';

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