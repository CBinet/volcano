import { MiddlewareRegister } from "./middleware-register";

export const Middleware = (middleware) : (target: any) => void => {
    return (target: any) => {
        const controllerName = target.name;
        const instance = new middleware();

        MiddlewareRegister.register(controllerName, instance);

        return target;
    };

}