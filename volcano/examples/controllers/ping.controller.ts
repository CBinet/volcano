import {
    Controller,
    GET,
    HttpController,
    HttpStatusCode,
    JsonResult,
    Middleware,
} from '../../core/http/volcano-http.module';
import { Guard } from '../middlewares/http/guard.http-middleware';
import { Logger } from '../middlewares/http/logger.http-middleware';

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