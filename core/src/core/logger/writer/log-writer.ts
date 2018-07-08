export abstract class LogWriter {
    abstract write(content: string, color?: string): void;
}