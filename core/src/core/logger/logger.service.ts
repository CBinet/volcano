import {LogWriter} from "./writer/log-writer";
import {ServiceLocator} from "../injection/service-locator";
import {LogType} from "./log-type.enum";

export class Logger {

    private static writer;

    static log(content: string, type?: LogType): void {
        if (this.writer === undefined) {
            this.writer = ServiceLocator.resolve(LogWriter);
        }
        this.writer.write(content, type);
    }
}