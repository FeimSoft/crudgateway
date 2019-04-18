### CRUD Gateway

### Installation

![npm](https://img.shields.io/npm/v/@feimsoft/crudgateway.svg?style=flat)

```bash
npm install @feimsoft/crudgateway --save
```

**yarn**

```bash
yarn add @feimsoft/crudgateway
```


### Installation

Import:
```ts
// using an ES6 transpiler, like babel
import { crudGateway, CrudGateway } from '@feimsoft/crudgateway';
```

Create your gateway:
```ts
export interface DeviceModel {
    id: number;
    name: string;
}

@crudGateway({ resource: 'device' })
export class DeviceGateway extends CrudGateway<DeviceModel> {

}
```

And use it:
```ts
import axios from 'axios';
const axiosInstance = axios.create();
const deviceGateway = new DeviceGateway(axiosInstance);
const device = await deviceGateway.create({
    name: 'Samsung Galaxy'
});
```