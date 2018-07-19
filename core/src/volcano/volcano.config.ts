import { Middleware } from "./middlewares/middleware";

export interface VolcanoConfig {
    controllers: any[];
    middlewares: typeof Middleware[];
}