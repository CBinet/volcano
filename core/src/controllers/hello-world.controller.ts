import {Controller }from "./controller"; 
import { Request, Response, RequestHandlerParams } from "express-serve-static-core";

export class HelloWorldController extends Controller {
    static helloWorld(): RequestHandlerParams {
        return (req: Request, res: Response) =>  {
            res.send('Hello World'); 
        }; 
    }

}