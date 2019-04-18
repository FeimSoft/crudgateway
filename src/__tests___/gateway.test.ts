import { crudGateway } from "../decorators";
import { FakeGateway, FakeModel } from './fake.gateway';
import { CriteriaCrudResponse, CrudResponse } from 'src/types';

import { AxiosInstance } from 'axios';
import axios from 'axios';
import * as moxios from "moxios";
import * as sinon from 'sinon'

describe('CRUD Gateway requests', () => {
    let axiosInstance: AxiosInstance;
    let fakeGateway: FakeGateway;

    beforeAll(() => {
        axiosInstance = axios.create({
            baseURL: 'http://localhost:3001/'
        });

        const fakeGatewayDecorated = crudGateway({
            resource: 'fake'
        })(FakeGateway);

        fakeGateway = new fakeGatewayDecorated(axiosInstance);
    });

    beforeEach(() => {
        moxios.install(axiosInstance as any);
    });

    afterEach(() => {
        moxios.uninstall(axiosInstance as any);
    });

    describe('findAll requests', () => {
        it('Simple request with success status', async (done) => {
            let onFulfilled = sinon.spy();
            fakeGateway.findAll().then(onFulfilled);

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();

                expect(request.config.method).toBe('get');
                expect(request.url).toBe('http://localhost:3001/fake');

                request.respondWith({
                    status: 200,
                    response: [{ id: 1 }],
                    headers: { 'X-Count-Items': '1' }
                }).then(() => {
                    expect(onFulfilled.called).toBe(true);
                    const response: CriteriaCrudResponse<FakeModel[]> = onFulfilled.getCall(0).args[0];
                    expect(response).toBeDefined();
                    expect(response.status).toBe(200);
                    expect(response.count).toBe(1);
                    expect(response.data).toBeInstanceOf(Array);
                    expect(response.data).toHaveLength(1);
                    expect(response.data[0]).toBeDefined();
                    expect(response.data[0].id).toBe(1);

                    done();
                });
            });
        });
    });

    describe('findOne requests', () => {
        it('Simple request with success status', async (done) => {
            let onFulfilled = sinon.spy();

            fakeGateway.findOne(1).then(onFulfilled);

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();

                expect(request.config.method).toBe('get');
                expect(request.url).toBe('http://localhost:3001/fake/1');

                return request.respondWith({
                    status: 200,
                    response: { id: 1 }
                }).then(() => {
                    expect(onFulfilled.called).toBe(true);
                    const response: CrudResponse<FakeModel> = onFulfilled.getCall(0).args[0];
                    expect(response).toBeDefined();
                    expect(response.status).toBe(200);
                    expect(response.data).toBeInstanceOf(Object);
                    expect(response.data.id).toBe(1);

                    done();
                })
            });
        });
    });

    describe('create requests', () => {
        it('Simple request with success status', async (done) => {
            let onFulfilled = sinon.spy();

            fakeGateway.create({ }).then(onFulfilled);

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();

                expect(request.config.method).toBe('post');
                expect(request.url).toBe('http://localhost:3001/fake');

                return request.respondWith({
                    status: 200,
                    response: { id: 1 }
                }).then(() => {
                    expect(onFulfilled.called).toBe(true);
                    const response: CrudResponse<FakeModel> = onFulfilled.getCall(0).args[0];
                    expect(response).toBeDefined();
                    expect(response.status).toBe(200);
                    expect(response.data).toBeInstanceOf(Object);
                    expect(response.data.id).toBe(1);

                    done();
                })
            });
        });
    });

    describe('update requests', () => {
        it('Simple request with success status', async (done) => {
            let onFulfilled = sinon.spy();

            fakeGateway.update(1, { }).then(onFulfilled);

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();

                expect(request.config.method).toBe('put');
                expect(request.url).toBe('http://localhost:3001/fake/1');

                return request.respondWith({
                    status: 200,
                    response: { id: 1 }
                }).then(() => {
                    expect(onFulfilled.called).toBe(true);
                    const response: CrudResponse<FakeModel> = onFulfilled.getCall(0).args[0];
                    expect(response).toBeDefined();
                    expect(response.status).toBe(200);
                    expect(response.data).toBeInstanceOf(Object);
                    expect(response.data.id).toBe(1);

                    done();
                })
            });
        });
    });

    describe('delete requests', () => {
        it('Simple request with success status', async (done) => {
            let onFulfilled = sinon.spy();

            fakeGateway.delete(1).then(onFulfilled);

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();

                expect(request.config.method).toBe('delete');
                expect(request.url).toBe('http://localhost:3001/fake/1');

                return request.respondWith({
                    status: 200,
                    response: { id: 1 }
                }).then(() => {
                    expect(onFulfilled.called).toBe(true);
                    const response: CrudResponse<FakeModel> = onFulfilled.getCall(0).args[0];
                    expect(response).toBeDefined();
                    expect(response.status).toBe(200);
                    expect(response.data).toBeInstanceOf(Object);
                    expect(response.data.id).toBe(1);

                    done();
                })
            });
        });
    });
})