import { Headers } from './headers';
export interface Message {
    message: string;
    content: any;
    headers?: Headers;
}
