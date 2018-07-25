import {ContainerOptions} from "./container-options";
import {Injectable} from "../decorators/injectable.decorator";

@Injectable(Container)
export class Container {

    static config(options?: ContainerOptions) { }
}