"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const volcano_module_1 = require("../core/volcano.module");
const car_controller_1 = require("./controllers/car.controller");
const chat_controller_1 = require("./controllers/chat.controller");
const legacy_controller_1 = require("./controllers/legacy.controller");
const pages_controller_1 = require("./controllers/pages.controller");
const ping_controller_1 = require("./controllers/ping.controller");
const text_controller_1 = require("./controllers/text-controller");
const guard_http_middleware_1 = require("./middlewares/http/guard.http-middleware");
const logger_http_middleware_1 = require("./middlewares/http/logger.http-middleware");
const car_repository_1 = require("./services/repositories/car-repository");
const in_memory_car_repository_1 = require("./services/repositories/in-memory-car-repository");
const PORT = 3000;
const server = volcano_module_1.Volcano.createServer({
    controllers: [
        ping_controller_1.PingController,
        car_controller_1.CarController,
        pages_controller_1.PagesController,
        legacy_controller_1.LegacyController,
        text_controller_1.TextController,
        chat_controller_1.ChatController
    ],
    middlewares: [
        logger_http_middleware_1.Logger,
        guard_http_middleware_1.Guard
    ],
    services: [
        { interface: car_repository_1.CarRepository, use: in_memory_car_repository_1.InMemoryCarRepository }
    ]
});
server.listen(PORT, null, () => {
    console.log(`Server started at port ${PORT}`);
});
//# sourceMappingURL=main.js.map