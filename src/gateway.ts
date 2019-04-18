import { CrudGatewayConfig, FetchProps, CrudResponse, CriteriaCrudResponse } from "./types";
import { isSuccessStatusCode } from './utils';
import { AxiosInstance, AxiosResponse } from 'axios';

export abstract class CrudGateway<TEntity> {

    protected readonly config: CrudGatewayConfig;
    protected readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
        if (!axios) {
            throw new Error('CRUD Gateway requires axios instance');
        }

        this.config = this.constructor['__crud__'];
        if (!this.config) {
            throw new Error('CRUD Gateway require decorator @crudGateway');
        }
    }

    async findAll(query?: any): Promise<CriteriaCrudResponse<TEntity[]>> {
        return await this.fetch({ method: 'GET', params: query }, (response) => {
            if (response.headers['x-count-items'] === undefined) {
                throw new Error('Expected header X-Count-Items');
            }
            return {
                status: response.status,
                data: response.data,
                count: parseInt(response.headers['x-count-items'])
            };
        });
    }

    async findOne(id: string | number): Promise<CrudResponse<TEntity>> {
        return await this.fetch({ method: 'GET', id });
    }

    async delete(id: string | number): Promise<CrudResponse<TEntity>> {
        return await this.fetch({ method: 'DELETE', id });
    }

    async update(id: string | number, entity: TEntity): Promise<CrudResponse<TEntity>> {
        return await this.fetch({ method: 'PUT', id, entity });
    }

    async create(entity: TEntity): Promise<CrudResponse<TEntity>> {
        return await this.fetch({ method: 'POST', entity });
    }

    protected async fetch<T, TResult = CrudResponse<T>>(props: FetchProps<T>, map?: (response: AxiosResponse<any>) => TResult): Promise<TResult> {
        const { resource } = this.config;
        const { method, id, params, entity } = props;

        const response = await this.axios(`${resource}${id !== undefined ? '/' + id : ''}`, {
            method: method,
            data: entity,
            params
        });

        if (!isSuccessStatusCode(response.status)) {
            throw new Error('Server response error');
        }

        return map ? map(response) : {
            status: response.status,
            data: response.data
        } as any;
    }
}