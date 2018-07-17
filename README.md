# Volcano

## Http Controller

```ts
@Controller()
export class CarController extends ApiController {

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
