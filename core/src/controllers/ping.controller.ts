import { GET } from '../core/http/actions/get-action.decorator';
import { JsonResult } from '../core/http/results/json-result';
import { ApiController } from '../core/volcano/controllers/api-controller';
import { Controller } from '../core/volcano/controllers/controller.decorator';
import { HttpStatusCode } from '../core/http/http-status-code.enum';
import { Middleware } from '../core/volcano/middlewares/middleware.decorator';
import { Logger } from '../middlewares/logger.middleware';

@Middleware(Logger)
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