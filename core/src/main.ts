import express = require('express');
import { Express } from 'express-serve-static-core';
import { Server } from 'http';

import { HelloWorldController } from './controllers/hello-world.controller';

const app: Express = express();
let server: Server;

const PORT = 3000;

app.get('/', HelloWorldController.helloWorld());
 
server = app.listen(PORT, null, () => {
    console.log(`Server started at port ${PORT}`);
});