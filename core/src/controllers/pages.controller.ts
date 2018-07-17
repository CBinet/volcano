import { GET } from '../volcano/http/actions/get-action.decorator';
import { ApiController } from '../volcano/http/controllers/api-controller';
import { Controller } from '../volcano/http/controllers/api-controller.decorator';
import { HttpStatusCode } from '../volcano/http/http-status-code.enum';
import { HtmlResult } from '../volcano/http/results/html-result';

@Controller()
export class PagesController extends ApiController {

    @GET('')
    index(): HtmlResult {
        const pathToFile =  __dirname + '/index.html';
        return new HtmlResult(HttpStatusCode.OK, pathToFile);
    }

}