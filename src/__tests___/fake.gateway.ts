import { CrudGateway } from "../gateway";

export interface FakeModel {
    id?: number;
}

export class FakeGateway extends CrudGateway<FakeModel> {
}