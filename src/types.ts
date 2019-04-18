export interface CrudGatewayConfig {
    resource: string;
}

export interface CrudResponse<TResult> {
    status: number;
    data: TResult;
}

export interface CriteriaCrudResponse<TResult> extends CrudResponse<TResult> {
    count: number;
}

export interface FetchProps<TEntity> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    id?: string | number;
    params?: any;
    entity?: TEntity;
}