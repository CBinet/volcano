import { HtmlResult } from '../core/http/results/html-result';
import { ApiController } from '../core/volcano/controllers/api-controller';
import { Controller } from '../core/volcano/controllers/controller.decorator';
import { GET } from '../core/http/actions/get-action.decorator';
import { HttpStatusCode } from '../core/http/http-status-code.enum';

@Controller()
export class PagesController extends ApiController {

    @GET('')
    index(): HtmlResult {
        const pathToFile =  __dirname + '/index.html';
        return new HtmlResult(HttpStatusCode.OK, pathToFile);
    }

}