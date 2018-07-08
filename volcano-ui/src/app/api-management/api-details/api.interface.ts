import { ApiRoute } from './api-routes/api-route-details/api-route.interface';

export interface Api {
    id: string;
    name: string;
    description: string;
    routes: ApiRoute[];
}
