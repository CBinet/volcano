import { Injectable } from '../volcano/injection/decorators/injectable.decorator';
import { Websocket } from '../volcano/ws/server/websocket';
import { Guid } from '../volcano/utilities/guid';

@Injectable(ChatService)
export class ChatService {

    setOnline(websocket: Websocket): string {
        const sessionId = Guid.generate();
        websocket.sessionId = sessionId;
        return sessionId;
    }

}