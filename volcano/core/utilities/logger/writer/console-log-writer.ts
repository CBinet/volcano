import {LogWriter} from "./log-writer";
import { Injectable } from "../../../injection/decorators/injectable.decorator";

const console: any = require("chalk-console");

@Injectable(LogWriter)
export class ConsoleLogWriter extends LogWriter {

    constructor() {
        super();
    }

    write(content: string, color?: string): void {
        if (color) {
            this.colorLog(content, color);
        } else {
            console.log("%c" + content, "color:" + "#ba68ff");
        }
    }

    private colorLog(message: string, color: string): void {
        color = color || "black";
        switch (color) {
            case "success":
                color = "Green";
                console.log("%c SUCCESS: " + "%c" + message, "color:" + color, "color:" + "White");
                break;
            case "info":
                color = "DodgerBlue";
                console.log("%c INFO: " + "%c" + message, "color:" + color, "color:" + "White");
                break;
            case "error":
                color = "Red";
                console.log("%c ERROR: " + "%c" + message, "color:" + color, "color:" + "White");
                break;
            case "warning":
                color = "Orange";
                console.log("%c WARNING: " + "%c" + message, "color:" + color, "color:" + "White");
                break;
            default:
                color = color;
        }
    }
}