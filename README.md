# Volcano

## Installation

```dos
npm install volcano-express
 ```

## Usage

```ts
const PORT = 3000;
const server = Volcano.createServer({
    controllers : [
        CarController,
        ChatController
    ],
    middlewares: [
        Logger,
        Guard
    ],
    services: [
        { interface: CarRepository, use: InMemoryCarRepository }
    ]
});

server.listen(PORT, null, () => {
    console.log(`Server started at port ${PORT}`);
});
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

Exemple :

```ts
@PUT('cars/:id')
updateCar(id: string, car: Car): Result {
    ...
}
```

In the above exemple, **id** is the first parameter because it comes from the route. The last parameter (**car**) is the request body.

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
