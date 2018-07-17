import { GET } from '../volcano/http/actions/get-action.decorator';
import { ApiController } from '../volcano/http/controllers/api-controller';
import { Controller } from '../volcano/http/controllers/api-controller.decorator';
import { HttpStatusCode } from '../volcano/http/http-status-code.enum';
import { XmlResult } from '../volcano/http/results/xml-result';

@Controller()
export class LegacyController extends ApiController {

    @GET('archives')
    getArchives(): XmlResult {
        const archives =  {
            data: 6,
            more: 'a'
        }
        return new XmlResult(HttpStatusCode.OK, archives);
    }

}