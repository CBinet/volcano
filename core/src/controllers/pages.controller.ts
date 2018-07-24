import { Controller, GET, HtmlResult, HttpController, HttpStatusCode } from '../volcano/http/volcano-http.module';

@Controller()
export class PagesController extends HttpController {

    @GET('')
    index(): HtmlResult {
        const pathToFile =  __dirname + '/index.html';
        return new HtmlResult(HttpStatusCode.OK, pathToFile);
    }

}