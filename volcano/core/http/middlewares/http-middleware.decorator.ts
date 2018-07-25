import { HttpMiddlewareRegister } from "./http-middleware-register";

export const Middleware = (middleware) : (target: any) => void => {
    return (target: any) => {
        const controllerName = target.name;
        const instance = new middleware();

        HttpMiddlewareRegister.registerForController(controllerName, instance);

        return target;
    };

}