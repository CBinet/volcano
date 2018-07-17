import { GET } from '../volcano/http/actions/get-action.decorator';
import { ApiController } from '../volcano/http/controllers/api-controller';
import { Controller } from '../volcano/http/controllers/api-controller.decorator';
import { HttpStatusCode } from '../volcano/http/http-status-code.enum';
import { TextResult } from '../volcano/http/results/text-result';

@Controller()
export class TextController extends ApiController {

    @GET('texts')
    getTexts(): TextResult {
        return new TextResult(HttpStatusCode.OK, 'Hello world !');
    }
    
}