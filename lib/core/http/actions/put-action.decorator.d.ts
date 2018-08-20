import { HttpMiddleware } from "../middlewares/http-middleware";
export declare function PUT(route: string, middlewares?: typeof HttpMiddleware[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
