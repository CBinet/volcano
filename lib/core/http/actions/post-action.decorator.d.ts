import { HttpMiddleware } from "../middlewares/http-middleware";
export declare function POST(route: string, middlewares?: typeof HttpMiddleware[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
