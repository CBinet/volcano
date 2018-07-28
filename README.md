# Volcano-express

- [Installation](#installation)
- [Get started](#get-started)
- [Dependency injection](#dependency-injection)
- [Http Controller](#http-controller)
- [Http Middleware](#http-middleware)
- [Websocket Controller](#websocket-controller)

## Installation

```dos
npm install volcano-express --save
 ```

## Get started

First, you will need a **main.ts** file where your configure and start the express server. It is also good practice to keep your controllers, middlewares and services in separated files. Here is a quick working example to get started :

- main.ts : Place at the root of your source folder

```ts
import { Volcano } from '../node_modules/volcano-express/lib/core/volcano.module';
import { DemoController } from './controllers/demo.controller';
import { DemoMiddleware } from './middlewares/demo.middleware';
import { DemoService } from './services/demo.service';
import { DummyDemoService } from './services/dummy-demo.service';

const PORT = 3000;
const server = Volcano.createServer({
    controllers : [
        DemoController
    ],
    middlewares: [
        DemoMiddleware
    ],
    services: [
        {interface: DemoService, use: DummyDemoService}
    ]
});

server.listen(PORT, null, () => {
    console.log(`Server started at port ${PORT}`);
});
```

- demo.controller.ts : 

```ts
import {
    Controller,
    GET,
    HttpController,
    HttpStatusCode,
    JsonResult,
    Middleware,
    Result,} from '../../node_modules/volcano-express/lib/core/http/volcano-http.module';
import { Inject } from '../../node_modules/volcano-express/lib/core/injection/volcano-injection.module';
import { DemoMiddleware } from '../middlewares/demo.middleware';
import { DemoService } from '../services/demo.service';

@Middleware(DemoMiddleware)
@Controller()
export class DemoController extends HttpController {

    @Inject(DemoService) demoService: DemoService;

    @GET('demo')
    demo(): Result {
        const content = this.demoService.demo();
        return new JsonResult(HttpStatusCode.OK, content);
    }
}
```

- demo.middleware.ts :

```ts
import { Middleware, Request, Response } from '../../node_modules/volcano-express/lib/core/http/volcano-http.module';

export class DemoMiddleware extends Middleware {  
    intercept(request: Request, response: Response): void {
        console.log('demo');
    }
}
```

- demo.service.ts :

```ts
export abstract class DemoService {
    abstract demo();
}
```

- dummy-demo.service.ts :

```ts
import { DemoService } from "./demo.service";

export class DummyDemoService extends DemoService {
    demo() {
        return {
            message: 'Demo'
        }
    }
}
```

Once you have built and started the server, you should be able to test it with an http request :

```dos
GET/ http://localhost:3000/demo
```

You should receive a **200 OK** response with the following content if everything is working properly :

```json
{
    "message": "Demo"
}
```

## Dependency Injection

There are multiples ways to register your services to inject them into your controllers or other services :

- Using the **@Injectable** decorator from the http module :

```ts
@Injectable(CarRepository)
export class InMemoryCarRepository {
    ...
}
```

- Using service registering the main file (which is the recommended way) :

```ts
const server = Volcano.createServer({
    controllers : [...],
    middlewares: [...],
    services: [
        { interface: CarRepository, use: InMemoryCarRepository }
    ]
});
```

- Using the **ServiceLocator** register method to register the service directly :

```ts
ServiceLocator.register(CarRepository, InMemoryCarRepository);
```

To inject the registered services into your controllers or others services, there are also a few ways.

- You can use the **@Inject** decorator from the http module (recommended way) :

```ts
@Inject(CarRepository) private carRepository: CarRepository;
```

- You can also call the **ServiceLocator** resolve method to get a service instance directly :

```ts
private carRepository: CarRepository = ServiceLocator.resolve(CarRepository);
```

## Http Controller

```ts
@Controller()
export class CarController extends HttpController {

    @Inject(CarService) private carService: CarService;

    @GET('cars')
    getCars(): Result {
        const cars = this.carService.findAll();
        return new JsonResult(HttpStatusCode.OK, cars);
    }

    @GET('cars/:id')
    getCar(id: string): Result {
        const car = this.carService.find(id);
        if (!car) return new JsonResult(HttpStatusCode.NOT_FOUND, {id});
        return new JsonResult(HttpStatusCode.OK, car);
    }

    @POST('cars')
    addCar(car: Car): Result {
        this.carService.add(car);
        return new JsonResult(HttpStatusCode.CREATED);
    }

    @PUT('cars/:id')
    updateCar(id: string, car: Car): Result {
        this.carService.update(id, car);
        return new JsonResult(HttpStatusCode.ACCEPTED);
    }

    @DELETE('cars/:id')
    deleteCar(id: string): Result {
        this.carService.delete(id);
        return new JsonResult(HttpStatusCode.ACCEPTED);
    }
}
```

### Http actions

- **GET**
- **POST**
- **PUT**
- **DELETE**

### Action parameters

The parameters of an **HttpAction** decorated method must be in this given order :
The parameters from the route (i.e.: id in '/cars/:id) must be first, in appearing order. The body will always be the last parameter of a signature. **GET** decorated method cannot have a body.

Example :

```ts
@PUT('cars/:id')
updateCar(id: string, car: Car): Result {
    ...
}
```

In the above example, **id** is the first parameter because it comes from the route. The last parameter (**car**) is the request body.

### Return types

- **JsonResult** : Returns JSON response with given status code.
- **TextResult** : Returns TEXT response with given status code.
- **HtmlResult** : Returns HTML response with given status code.
- **XmlResult** : Returns XML response with given status code.

You can also extend the **Result** class to implement a custom return type:

```ts
export class CustomResult extends Result {

    sendWith(response: Response): void {
        ...
    }
}
```

## Http middleware

You can add middlewares to intercept requests. You can create your own middleware by extending the **HttpMiddleware** class :

```ts
export class Logger extends HttpMiddleware {

    intercept(request: Request, response: Response): boolean {
        console.log('I am interceptor');
        return true;
    }
}
```

You can then add a middleware on a controller, which will apply it for all the routes owned by that controller :

```ts
@Middleware(Logger) // <-- Added a middleware to all the routes
@Controller()
export class PingController extends HttpController {
    ...
}
```

You can also add it on specific routes :

```ts
@GET('ping', [Logger]) // <-- Added a middleware to this specific route
ping(): JsonResult {
    ...
}
```

When you have multiple middlewares applied to a controller or route, they will always apply in order of appearance in the method signature :

```ts
@GET('ping', [Logger, Guard]) // <-- Logger will be first, Guard will be second
ping(): JsonResult {
    ...
}
```

When you have middlewares on the controller and on a route, the middlewares from the controller will be applied first :

```ts
@Middleware(Logger) // <-- Logger will be first
@Controller()
export class PingController extends HttpController {
    @GET('ping', [Guard]) // <-- Guard will be second
    ping(): JsonResult {
        ...
    }
}
```

## Websocket Controller

```ts
@WebsocketController()
export class ChatController extends WsController {

    @OnConnect()
    onConnect(server: WebSocket.Server): WebsocketResponse {
        return new JsonWebsocketResponse({message: 'hello'}, broadcast: true);
    }

    @On('all')
    onSendMessage(message: string, server: WebSocket.Server) : WebsocketResponse {
        return new TextWebsocketResponse(message, broadcast: true);
    }

    @On('whisper')
    onSendWhisper(person: string, message: string, server: WebSocket.Server) : WebsocketResponse {
        return new XmlWebsocketResponse({message});
    }

    @OnDisconnect()
    onDisconnect(server: WebSocket.Server) : WebsocketResponse {
        return new JsonWebsocketResponse({message: 'Goodbye'}, broadcast: true);
    }
}
```
