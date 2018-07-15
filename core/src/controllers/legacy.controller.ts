import { GET } from '../core/http/actions/get-action.decorator';
import { XmlResult } from '../core/http/results/xml-result';
import { ApiController } from '../core/volcano/controllers/api-controller';
import { Controller } from '../core/volcano/controllers/api-controller.decorator';
import { HttpStatusCode } from '../core/http/http-status-code.enum';

@Controller()
export class LegacyController extends ApiController {

    @GET('archives')
    getArchives(): XmlResult {
        const archives =  {
            data: 6,
            moreData: 'a'
        }
        return new XmlResult(HttpStatusCode.OK, archives);
    }

}