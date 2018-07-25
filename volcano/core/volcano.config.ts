import { HttpMiddleware } from "./http/middlewares/http-middleware";

export interface VolcanoConfig {
    controllers?: any[];
    middlewares?: typeof HttpMiddleware[];
    services?: ServiceRegister[];
}

interface ServiceRegister {
    interface: any;
    use: any;
}