# Volcano-express

- [Installation](#installation)
- [Get started](#get-started)
  - [Prerequisites](#prerequisites)
  - [Create the project](#create-the-project)
- [Dependency Injection Module](#dependency-injection-module)
  - [Registering](#registering)
  - [Resolving](#resolving)
- [Http Module](#http-module)
  - [Http Controller](#http-controller)
  - [Http Middleware](#http-middleware)
- [Websocket Module](#websocket-module)
  - [Websocket Controller](#websocket-controller)
  - [Websocket Middleware](#websocket-middleware)

## Get started

### Prerequisites

```dos
npm install volcano-express-cli -g
 ```

### Create the project
  
To create all the files and import all the dependencies needed for a new project, simply use the **init** command from the CLI.  
The **init** command will create all the files needed to get started.

```dos
volcano --init
```

You can find more informations on the CLI commands on the [Volcano-express CLI](https://www.npmjs.com/package/volcano-express-cli) npm package page.

### Start the server

To start the server, use the **npm start** command.  
By default, the server starts at port 3000.

```dos
npm start
```

If the server starts with no error, it outputs a success message in the console :

```dos
Server started at port 3000
```

### Test the server

Once you have started the server, you should be able to test it with an http request at :

```dos
GET/ http://localhost:3000/demo
```

You should receive a 200 OK response with the following content if everything is working properly :

```dos
"Demo"
```

## Dependency Injection Module

### Registering

There are multiples ways to register your services to inject them into your controllers or other services :

- Using the **@Injectable** decorator :

```ts
@Injectable(CarRepository)
export class InMemoryCarRepository {
    ...
}
```

- Using service registering the main file :

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

### Resolving

A few way are available to inject the registered services into your controllers or others services.

- You can use the **@Inject** decorator :

```ts
@Inject(CarRepository) private carRepository: CarRepository;
```

- You can also call the **ServiceLocator** resolve method to get a service instance directly :

```ts
private carRepository: CarRepository = ServiceLocator.resolve(CarRepository);
```

## Http Module

### Http Controller

```ts
@Controller()
export class CarController extends HttpController {}
```

#### Http actions

The following http actions are supported by the **HttpController** :

- **GET**
- **POST**
- **PUT**
- **DELETE**

```ts
@Controller()
export class CarController extends HttpController {

    @GET('cars')
    getCars(): Result { ... }

    @POST('cars')
    addCar(car: Car): Result { ... }

    @PUT('cars/:id')
    updateCar(id: string, car: Car): Result { ... }

    @DELETE('cars/:id')
    deleteCar(id: string): Result { ... }
}
```

The parameters of an **HttpAction** decorated method must be in this given order :
The parameters from the route (i.e.: id in '/cars/:id) must be first, in appearing order. The body will always be the last parameter of a signature. **GET** decorated method cannot have a body.

```ts
@Controller()
export class CarController extends HttpController {

    @PUT('cars/:id')
    updateCar(id: string, car: Car): Result {
        ...
    }
}
```

In the above example, **id** is the first parameter because it comes from the route. The last parameter (**car**) is the request body.

The **Result** that must be returned by an HttpAction needs an **HttpStatusCode**. The content is optional.  
The following types are the ones available by default :

- **JsonResult** : Returns JSON response
- **TextResult** : Returns TEXT response
- **HtmlResult** : Returns HTML response
- **XmlResult** : Returns XML response

```ts
@Controller()
export class CarController extends HttpController {

    @GET('cars')
    getCars(): Result {
        const cars = ...
        return new JsonResult(HttpStatusCode.OK, cars);
    }
}
```

You can also extend the **Result** class to implement a custom return type:

```ts
export class CustomResult extends Result {

    sendWith(response: Response): void {
        response.status(this.statusCode).send(...)
    }
}
```

### Http middleware

Middlewares are used to intercept requests before an **HttpAction** from a [**HttpController**](#http-controller) is called.  
You can add middlewares to a controller or a specific route to intercept requests.  
When a request is intercepted, you have access to the actuals **express** request and response.

#### Creating an http middleware

You can create a middleware by extending the **HttpMiddleware** class :

```ts
export class Logger extends HttpMiddleware {

    intercept(request: Request, response: Response): boolean {
        console.log('I am interceptor');
        return true;
    }
}
```

#### Applying a middleware to an http controller

When you add a middleware on a controller, it will apply the middleware for all the routes of that controller :

```ts
@Middleware(Logger) // <-- Added a middleware to all the routes
@Controller()
export class PingController extends HttpController {
    ...
}
```

#### Applying a middleware to a specific route

You can also add it on specific routes :

```ts
@Controller()
export class PingController extends HttpController {

    @GET('ping', [Logger]) // <-- Added a middleware to this specific route
    ping(): JsonResult {
        ...
    }
}
```

#### Http middlewares order

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

## Websocket Module

### Websocket Controller

#### Websocket actions

The following websocket actions are supported by the **WebsocketController** :

- **OnConnect**
- **OnDisconnect**
- **OnMessage**

```ts
@WebsocketController()
export class ChatController extends WsController {

    @OnConnect()
    onConnect(websocket: Websocket, server: Server): WebsocketResponse { ... }

    @OnDisconnect()
    onDisconnect(websocket: Websocket, server: Server) : WebsocketResponse { ... }

    @On('message')
    onSendMessage(message: string, websocket: Websocket, server: Server) : WebsocketResponse { ... }
}
```

The parameters of a **WebsocketAction** decorated method must be in this given order :

- **OnConnect** and **OnDisconnect** : The OnConnect and OnDisconnect have both access to the websocket instance and the server instance in that given order.

```ts
@OnConnect()
onConnect(websocket: Websocket, server: Server): WebsocketResponse { ... }

@OnDisconnect()
onDisconnect(websocket: Websocket, server: Server) : WebsocketResponse { ... }
```

- **OnMessage** : The OnMessage method has as first parameter the body of the message. The OnMessage have also access to the websocket instance and the server instance in that given order as the last two (2) parameters of the signature.

```ts
@On('message')
onSendMessage(message: string, websocket: Websocket, server: Server) : WebsocketResponse { ... }
```

The **WebsocketResponse** that must be returned by WebsocketAction need a content.  
You can specify which clients to send the response to with the broadcast property or the receivers list.
The following types are the ones available by default :

- **JsonWebsocketResponse** : Returns JSON response
- **TextWebsocketResponse** : Returns TEXT response
- **XmlWebsocketResponse** : Returns XML response

For example, a **JsonWebsocketResponse** return would look like this :

```ts
@OnConnect()
onConnect(websocket: Websocket, server: Server): WebsocketResponse {
    const sessionId = ...
    return new JsonWebsocketResponse({sessionId, event: "Has come online"}, broadcast: true);
}
```

This would send a message to all the connected clients which says that someone has just come online :

```json
{
    "sessionId" : "...",
    "event" : "Has come online"
}
```

You can also extend the **WebsocketResponse** class to implement a custom return type:

```ts
export class CustomWebsocketResponse extends WebsocketResponse {

    sendWith(server: Server, websocket: Websocket) {
        const content = ...
        this.send(server, websocket, content);
    }
}
```

### Websocket middleware

Middlewares are used to intercept requests before an **WebsocketAction** from a [**WebsocketController**](#websocket-controller) is called.  
You can add middlewares to a controller or a specific action to intercept requests.

#### Creating a websocket middleware

You can create a middleware by extending the **WebsocketMiddleware** class :

```ts
export class Logger extends HttpMiddleware {

    intercept(request: Request, response: Response): boolean {
        console.log('I am interceptor');
        return true;
    }
}
```

#### Applying a middleware to a websocket controller

When you add a middleware on a controller, it will apply the middleware for all the actions of that controller :

```ts
@Middleware(Logger) // <-- Added a middleware to all the routes
@WebsocketController()
export class ChatController extends WsController {
    ...
}
```

#### Applying a middleware to a specific action

You can also add it on specific action :

```ts
@WebsocketController()
export class ChatController extends WsController {

    @OnConnect([Logger]) // <-- Added a middleware to this specific action
    onConnect(websocket: Websocket, server: Server): WebsocketResponse {
        ...
    }
}
```

#### Websocket middlewares order

Look at the [Http middlewares order](#http-middlewares-order) section for how the middlewares order works.