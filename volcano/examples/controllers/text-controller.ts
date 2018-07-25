import { Controller, GET, HttpController, HttpStatusCode, TextResult } from '../../core/http/volcano-http.module';

@Controller()
export class TextController extends HttpController {

    @GET('texts')
    getTexts(): TextResult {
        return new TextResult(HttpStatusCode.OK, 'Hello world !');
    }
    
}