import { CrudGatewayConfig } from "./types";
import { CrudGateway } from './gateway';

export function crudGateway<TEntity>(config: CrudGatewayConfig) {
    return function <TCrudGateway extends new (...args: {}[]) => CrudGateway<TEntity>>(target: TCrudGateway) {
        Object.defineProperty(target, '__crud__', {
            configurable: false,
            enumerable: false,
            value: config,
            writable: false
        });
        return target;
    }
}