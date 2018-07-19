import { MiddlewareRegister } from "./middleware-register";

export const Middleware = (middleware) : (target: any) => void => {
    return (target: any) => {
        const controllerName = target.name;
        const instance = new middleware();

        MiddlewareRegister.registerForController(controllerName, instance);

        return target;
    };

}