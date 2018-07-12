import { JsonResult } from "../../http/results/json-result";
import { HttpStatusCode } from "../../http/http-status-code.enum";
import { Result } from "../../http/results/result";

export abstract class ApiController {

    // protected ok<T extends Result>(content?) {
    //     return Result.create(HttpStatusCode.OK, content);
    //     return new JsonResult(HttpStatusCode.OK, content);
    // }

    // protected accepted(content?) {
    //     return new JsonResult(HttpStatusCode.ACCEPTED, content);
    // }

    // protected created(content?) {
    //     return new JsonResult(HttpStatusCode.CREATED, content);
    // }

    // protected badRequest(content?) {
    //     return new JsonResult(HttpStatusCode.BAD_REQUEST, content);
    // }

    // protected unauthorized(content?) {
    //     return new JsonResult(HttpStatusCode.UNAUTHORIZED, content);
    // }

    // protected forbidden(content?) {
    //     return new JsonResult(HttpStatusCode.FORBIDDEN, content);
    // }

    // protected notFound(content?) {
    //     return new JsonResult(HttpStatusCode.NOT_FOUND, content);
    // }

    // protected serverError(content?) {
    //     return new JsonResult(HttpStatusCode.SERVER_ERROR, content);
    // }
}   