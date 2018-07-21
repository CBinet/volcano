import { HttpMiddleware } from "./http/middlewares/http-middleware";

export interface VolcanoConfig {
    controllers: any[];
    middlewares: typeof HttpMiddleware[];
}