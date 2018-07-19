import { Injectable } from "../volcano/injection/decorators/injectable.decorator";

@Injectable(ChatService)
export class ChatService {

    setOnline(id: string) {
        console.log('woaaahh');
    }

}