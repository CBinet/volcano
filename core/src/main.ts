import { CarController } from './controllers/car.controller';
import { ChatController } from './controllers/chat.controller';
import { LegacyController } from './controllers/legacy.controller';
import { PagesController } from './controllers/pages.controller';
import { PingController } from './controllers/ping.controller';
import { TextController } from './controllers/text-controller';
import { Guard } from './middlewares/http/guard.http-middleware';
import { Logger } from './middlewares/http/logger.http-middleware';
import { Volcano } from './volcano/volcano';
import { CarRepository } from './services/repositories/car-repository';
import { InMemoryCarRepository } from './services/repositories/in-memory-car-repository';
import { CarService } from './services/car.service';
import { ChatService } from './services/chat.service';
import { LogWriter } from './volcano/logger/writer/log-writer';
import { ConsoleLogWriter } from './volcano/logger/writer/console-log-writer';

const PORT = 3000;
const server = Volcano.createServer({
    controllers : [
        PingController,
        CarController,
        PagesController,
        LegacyController,
        TextController,
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