import { Guard } from '../middlewares/http/guard.http-middleware';
import { Logger } from '../middlewares/http/logger.http-middleware';
import {
    Controller,
    GET,
    HttpController,
    HttpStatusCode,
    JsonResult,
    Middleware,
} from '../volcano/http/volcano-http.module';

@Middleware(Logger)
@Middleware(Guard)
@Controller()
export class PingController extends HttpController {

    @GET('ping')
    ping(): JsonResult {
        const result = {
            date: new Date()
        };
        return new JsonResult(HttpStatusCode.OK, result);
    }

}