import { Controller } from "../core/volcano/controllers/api-controller.decorator";
import { ApiController } from "../core/volcano/controllers/api-controller";
import { TextResult } from "../core/http/results/text-result";
import { HttpStatusCode } from "../core/http/http-status-code.enum";
import { GET } from "../core/http/actions/get-action.decorator";

@Controller()
export class TextController extends ApiController {

    @GET('texts')
    getTexts(): TextResult {
        return new TextResult(HttpStatusCode.OK, 'Hello world !');
    }
    
}