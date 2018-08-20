export interface VolcanoConfig {
    cors?: boolean;
    controllers?: any[];
    middlewares?: any[];
    services?: ServiceRegister[];
}
interface ServiceRegister {
    interface: any;
    use: any;
}
export {};
