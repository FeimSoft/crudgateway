import { crudGateway } from "../decorators";
import { CrudGatewayConfig } from "../types";
import { FakeGateway } from './fake.gateway';

describe('Tests over gateway decorators', () => {
    it('Decorators is applied to Gateway', () => {
        const decoratedGateway = crudGateway({
            resource: 'fake'
        })(FakeGateway);

        expect(decoratedGateway).toBeDefined();

        const config: CrudGatewayConfig = decoratedGateway['__crud__'];
        expect(config).toBeDefined();
        expect(config.resource).toBe('fake');
    });
});