import { Controller, GET, HttpController, HttpStatusCode, XmlResult } from '../../core/http/volcano-http.module';

@Controller()
export class LegacyController extends HttpController {

    @GET('archives')
    getArchives(): XmlResult {
        const archives =  {
            data: 6,
            more: 'a'
        }
        return new XmlResult(HttpStatusCode.OK, archives);
    }

}