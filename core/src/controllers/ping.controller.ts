import { Guard } from '../middlewares/http/guard.http-middleware';
import { Logger } from '../middlewares/http/logger.http-middleware';
import { GET } from '../volcano/http/actions/get-action.decorator';
import { ApiController } from '../volcano/http/controllers/api-controller';
import { Controller } from '../volcano/http/controllers/api-controller.decorator';
import { HttpStatusCode } from '../volcano/http/http-status-code.enum';
import { JsonResult } from '../volcano/http/results/json-result';
import { Middleware } from '../volcano/http/middlewares/http-middleware.decorator';


@Middleware(Logger)
@Middleware(Guard)
@Controller()
export class PingController extends ApiController {

    @GET('ping')
    ping(): JsonResult {
        const result = {
            date: new Date()
        };
        return new JsonResult(HttpStatusCode.OK, result);
    }

}